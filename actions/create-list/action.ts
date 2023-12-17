"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createActions } from "@/lib/createActions";
import { CreateList } from "./schema";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, boardId } = data;
  let list;
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });
    if (!board) {
      return {
        error: "Board Not Found",
      };
    }
    const lastList = await db.list.findFirst({
      where: {
        boardId: board?.id,
      },
      select: {
        order: true,
      },
      orderBy: {
        order: "desc",
      },
    });
    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create list",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createActions(CreateList, handler);
