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

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "User is not authenticated",
    };
  }

  const canCreateBoard = await hasAvailableCount();

  if (!canCreateBoard) {
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
    await incrementAvailableCount();

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
