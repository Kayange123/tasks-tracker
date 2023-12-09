import { z } from "zod";

export type FieldErrors<T> = {
  [P in keyof T]?: string[];
};

export type ActionState<Input, Output> = {
  error?: string | null;
  data?: Output;
  fieldErrors?: FieldErrors<Input>;
};

export const createActions = <Input, Output>(
  schema: z.Schema<Input>,
  handler: (input: Input) => Promise<ActionState<Input, Output>>
) => {
  return async (input: Input): Promise<ActionState<Input, Output>> => {
    const validationResult = schema.safeParse(input);
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<Input>,
      };
    }
    return await handler(validationResult.data);
  };
};
