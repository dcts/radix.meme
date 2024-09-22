import * as z from "zod";

export const CreateCoinInputSchema = z.object({
  name: z.string().min(4, { message: "Required" }),
  symbol: z.string().min(3, { message: "Required" }),
  description: z
    .string()
    .min(16, { message: "Must be at least 16 characters" })
    .max(140, { message: "Must be 140 characters or less" }),
  // TODO image file validation
  image: z.any(),
  telegramUrl: z.string().url().optional(),
  xUrl: z.string().url().optional(),
  website: z.string().url().optional(),
});

export type TCreateCoinInput = z.infer<typeof CreateCoinInputSchema>;
