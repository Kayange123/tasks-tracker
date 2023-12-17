"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createActions } from "@/lib/createActions";
import { UpdateBoard } from "./schema";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, id } = data;
  let board;
  try {
    board = await db.board.update({
      data: {
        title,
      },
      where: {
        id,
        orgId,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update",
    };
  }

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createActions(UpdateBoard, handler);
