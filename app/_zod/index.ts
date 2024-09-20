import * as z from "zod";

export const CreateCoinInputSchema = z.object({
  name: z.string().min(4, { message: "Required" }),
  symbol: z.string().min(3, { message: "Required" }),
  description: z.string().min(9, { message: "Required" }),
  // TODO image file validation
  image: z.any(),
  telegramUrl: z.string().url().optional(),
  xUrl: z.string().url().optional(),
  website: z.string().url().optional(),
});

export type TCreateCoinInput = z.infer<typeof CreateCoinInputSchema>;
