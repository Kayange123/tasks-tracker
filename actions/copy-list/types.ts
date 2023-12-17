import { ActionState } from "@/lib/createActions";
import { CopyList } from "./schema";
import { z } from "zod";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>;
