import * as z from "zod";

export const CreateCoinFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Must be at least 4 characters" })
    .max(42, { message: "Must be 42 characters or less" }),
  ticker: z
    .string()
    .min(3, { message: "Must be at least 3 characters" })
    .max(12, { message: "Must be 12 characters or less" }),
  description: z
    .string()
    .min(16, { message: "Must be at least 16 characters" })
    .max(140, { message: "Must be 140 characters or less" }),
  // TODO image file validation
  image: z.any(),
  // image: z
  //   .array(z.instanceof(File))
  //   .refine((files) => files.length > 0, {
  //     message: "Image is required",
  //   })
  //   .refine(
  //     (files) => {
  //       return files.every((file) =>
  //         ["image/jpeg", "image/png"].includes(file.type)
  //       );
  //     },
  //     {
  //       message: "Only JPEG and PNG formats are allowed",
  //     }
  //   )
  //   .refine(
  //     (files) => {
  //       return files.every((file) => file.size <= 2_000_000); // 2 MB in bytes
  //     },
  //     {
  //       message: "File size must not exceed 2 MB",
  //     }
  //   ),
  telegramUrl: z.string().optional(),
  xUrl: z.string().optional(),
  website: z.string().optional(),
});

export type TCreateCoinForm = z.infer<typeof CreateCoinFormSchema>;
