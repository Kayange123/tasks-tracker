import { ActionState } from "@/lib/createActions";
import { UpdateBoard } from "./schema";
import { z } from "zod";
import { Board } from "@prisma/client";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Board>;
