import * as z from "zod";

export const CreateCoinInputSchema = z.object({
  name: z.string().min(4, { message: "Name is required" }),
  ticker: z.string().min(3, { message: "Ticker is required" }),
  description: z
    .string()
    .min(16, { message: "Must be at least 16 characters" })
    .max(140, { message: "Must be 140 characters or less" }),
  // TODO image file validation
  image: z
    .array(z.instanceof(File))
    .refine((files) => files.length > 0, {
      message: "Image is required",
    })
    .refine(
      (files) => {
        return files.every((file) =>
          ["image/jpeg", "image/png"].includes(file.type)
        );
      },
      {
        message: "Only JPEG and PNG formats are allowed",
      }
    )
    .refine(
      (files) => {
        return files.every((file) => file.size <= 2_000_000); // 2 MB in bytes
      },
      {
        message: "File size must not exceed 2 MB",
      }
    ),
  telegramUrl: z.string().url().optional(),
  xUrl: z.string().url().optional(),
  website: z.string().url().optional(),
});

export type TCreateCoinInput = z.infer<typeof CreateCoinInputSchema>;
