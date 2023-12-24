import { ActionState } from "@/lib/createActions";
import { StripeRedirect } from "./schema";
import { z } from "zod";

export type InputType = z.infer<typeof StripeRedirect>;
export type ReturnType = ActionState<InputType, string>;
