import * as z from "zod";

export const DESCRIPTION_MAX_CHAR_COUNT = 400;
export const TOKEN_MAX_CHAR_COUNT = 20;

export const CreateCoinFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Must be at least 3 characters" })
    .max(20, { message: "Must be 20 characters or less" }),
  ticker: z
    .string()
    .min(3, { message: "Must be at least 3 characters" })
    .max(20, { message: "Must be 20 characters or less" }),
  description: z.string().max(DESCRIPTION_MAX_CHAR_COUNT, {
    message: "Must be 400 characters or less",
  }),
  image: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "File is required.",
    })
    .refine(
      (files) => {
        if (!files || files.length === 0) return false;
        const file = files[0];
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        return validTypes.includes(file.type);
      },
      {
        message: "Only jpeg, jpg, and png are allowed.",
      }
    )
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return files?.[0] ? files[0].size <= 2 * 1024 * 1024 : true;
      },
      {
        message: "File size should not exceed 2MB.",
      }
    ),
  telegramUrl: z.string().optional(),
  xUrl: z.string().optional(),
  website: z.string().optional(),
});

export type TCreateCoinForm = z.infer<typeof CreateCoinFormSchema>;
