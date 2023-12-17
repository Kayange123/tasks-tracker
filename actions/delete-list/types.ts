import { ActionState } from "@/lib/createActions";
import { DeleteList } from "./schema";
import { z } from "zod";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;
