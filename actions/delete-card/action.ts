"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType } from "./types";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createActions } from "@/lib/createActions";
import { DeleteCard } from "./schema";

export const handler = async (data: InputType) => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;
  let card;
  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
  } catch (error) {
    //in case of error, return an error object and exit
    return {
      error: "Failed to delete card",
    };
  }
  //let next update the page
  revalidatePath(`/board/${boardId}`);
  return { data: card }; // return the list and exit
};

export const deleteCard = createActions(DeleteCard, handler);
