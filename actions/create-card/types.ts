import { ActionState } from "@/lib/createActions";
import { CreateCard } from "./schema";
import { z } from "zod";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>;
