"use server";

import { pinata } from "../../lib/pinata/config";

export async function createPinataUrl(formData: FormData) {
  const imageFile = formData.get("image") as File;

  try {
    const uploadData = await pinata.upload.file(imageFile);
    const ipfsUrl = await pinata.gateways.convert(uploadData.IpfsHash);

    return {
      status: "success",
      ipfsUrl,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
    };
  }
}
