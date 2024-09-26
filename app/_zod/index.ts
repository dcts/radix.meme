import * as z from "zod";

export const CreateCoinFormSchema = z.object({
  // name: z
  //   .string()
  //   .min(4, { message: "Must be at least 4 characters" })
  //   .max(42, { message: "Must be 42 characters or less" }),
  // ticker: z
  //   .string()
  //   .min(3, { message: "Must be at least 3 characters" })
  //   .max(12, { message: "Must be 12 characters or less" }),
  // description: z
  //   .string()
  //   .min(16, { message: "Must be at least 16 characters" })
  //   .max(140, { message: "Must be 140 characters or less" }),
  // image: z
  //   .any()
  //   .refine((files) => files instanceof FileList && files.length > 0, {
  //     message: "File is required.",
  //   })
  //   .refine(
  //     (files) => {
  //       const file = files[0];
  //       const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  //       return file ? validTypes.includes(file.type) : true;
  //     },
  //     {
  //       message: "Only jpeg, jpg, and png are allowed.",
  //     }
  //   )
  //   .refine(
  //     (files) => {
  //       return files?.[0] ? files[0].size <= 2 * 1024 * 1024 : true;
  //     },
  //     {
  //       message: "File size should not exceed 2MB.",
  //     }
  //   ),
  // telegramUrl: z.string().optional(),
  // xUrl: z.string().optional(),
  // website: z.string().optional(),
});

export type TCreateCoinForm = z.infer<typeof CreateCoinFormSchema>;
