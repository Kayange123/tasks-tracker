import { z } from "zod";

export const createBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title should be provided",
      invalid_type_error: "Title should be a provided as string",
    })
    .min(3, {
      message: "Title should be at least 3 characters long",
    })
    .max(100),
  image: z.string({
    required_error: "Image should be provided",
    invalid_type_error: "Image should be provided",
  }),
});
