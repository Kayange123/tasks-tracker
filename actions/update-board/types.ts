import { ActionState } from "@/lib/createActions";
import { CreateList } from "./schema";
import { z } from "zod";
import {  List } from "@prisma/client";

export type InputType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputType, List>;
