import { ActionState } from "@/lib/createActions";
import { UpdateList } from "./schema";
import { z } from "zod";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof UpdateList>;
export type ReturnType = ActionState<InputType, List>;
