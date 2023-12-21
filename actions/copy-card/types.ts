import { ActionState } from "@/lib/createActions";
import { CopyCard } from "./schema";
import { z } from "zod";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>;
