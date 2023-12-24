"use server";
import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/orgLimit";
import { revalidatePath } from "next/cache";
import { createActions } from "@/lib/createActions";
import { createBoardSchema } from "./schema";
import { createAuditLog } from "@/lib/createAuditLogs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { checkSubscription } from "@/lib/subscription";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const canCreateBoard = await hasAvailableCount();
  const isPro = await checkSubscription();

  if (!userId || !orgId) {
    return {
      error: "User is not authenticated",
    };
  }

  if (!canCreateBoard && !isPro) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade your plan to create more boards",
    };
  }

  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");
  let board;

  if (
    !title ||
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: "No image is provided. Failed to create board",
    };
  }
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    });

    //Increase # of boards iff isNotPro
    if (!isPro) {
      await incrementAvailableCount();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
      entityId: board.id,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create board",
    };
  }
  revalidatePath(`board/${board.id}`);
  return { data: board };
};

export const createBoard = createActions(createBoardSchema, handler);
