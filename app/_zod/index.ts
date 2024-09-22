import * as z from "zod";

export const CreateCoinInputSchema = z.object({
  name: z.string().min(4, { message: "Required" }),
  ticker: z.string().min(3, { message: "Required" }),
  description: z
    .string()
    .min(16, { message: "Must be at least 16 characters" })
    .max(140, { message: "Must be 140 characters or less" }),
  // TODO image file validation
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Image is required",
    })
    .refine(
      (files) => {
        if (files.length > 0) {
          const file = files[0];
          return ["image/jpeg", "image/png"].includes(file.type); // Accept JPEG and PNG
        }
        return false;
      },
      {
        message: "Only JPEG and PNG formats are allowed",
      }
    ),
  telegramUrl: z.string().url().optional(),
  xUrl: z.string().url().optional(),
  website: z.string().url().optional(),
});

export type TCreateCoinInput = z.infer<typeof CreateCoinInputSchema>;
