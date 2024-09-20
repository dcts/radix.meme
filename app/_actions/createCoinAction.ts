"use server";

import { pinata } from "../../lib/pinata/config";

// TODO handle server-side zod validation -> https://next-safe-action.dev/docs/integrations/react-hook-form
// TODO handle pinata errors

export async function createCoinAction(formData: FormData) {
  // const name = formData.get("name");
  // const symbol = formData.get("symbol");
  // const description = formData.get("description");
  // const telegramUrl = formData.get("telegramUrl");
  // const xUrl = formData.get("xUrl");
  // const website = formData.get("website");
  const imageFile = formData.get("image") as File;

  // upload img to pinata => imgUrl
  const uploadData = await pinata.upload.file(imageFile);
  const imageUrl = await pinata.gateways.convert(uploadData.IpfsHash);
  console.log("imageUrl", imageUrl);

  // create on-chain TRX

  // return response to client
  return {
    status: "success",
  };
}
