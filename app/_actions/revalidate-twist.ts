"use server";

import { revalidatePath } from "next/cache";

export async function revalidateTwist(path: string) {
  revalidatePath(path);
  return { status: "success" };
}
