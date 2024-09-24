"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { pinata } from "../../lib/pinata/config";

// TODO SIEG handle server-side zod validation -> https://next-safe-action.dev/docs/integrations/react-hook-form
// TODO SIEG handle pinata errors

export async function createCoinAction(formData: FormData) {
  /** extract data from client sent form-data */
  // const name = formData.get("name");
  // const symbol = formData.get("symbol");
  // const description = formData.get("description");
  // const telegramUrl = formData.get("telegramUrl");
  // const xUrl = formData.get("xUrl");
  // const website = formData.get("website");
  const imageFile = formData.get("image") as File;

  /** initialize token data that should be returned from radix TRX */
  let newToken = undefined;

  try {
    /** 1. upload img to pinata => imgUrl */
    const uploadData = await pinata.upload.file(imageFile);
    const imageUrl = await pinata.gateways.convert(uploadData.IpfsHash);
    console.log("imageUrl", imageUrl);

    /** 2. create on-chain TRX => get token address */
    // TODO THOMAS
    newToken = { address: "0x..." };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    // TODO SIEG || SAIDA
    /** Handle errors - return response to client - MUST BE STRINGiFYABLE */
    return {
      status: "error",
    };
  }

  // 4. redirect to /token/:address page --- https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirect-function
  revalidatePath("/"); // Update cached tokens in home page
  redirect(`/token/${newToken.address}`); // Navigate to the new token page
}
