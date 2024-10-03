"use client";

import React, { useState, forwardRef, InputHTMLAttributes } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCoinFormSchema, DESCRIPTION_MAX_CHAR_COUNT } from "@/app/_zod";
import { Label } from "@radix-ui/react-label";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { createPinataUrl } from "@/app/_actions/create-pinata-url";
import { TokenInfo } from "@/app/_store/tokenStoreSlice";
import { launchTokenTxManifest } from "@/utils/tx-utils";
import { useAppSelector } from "@/app/_hooks/hooks";
import {
  getGatewayApiClientFromScratchOrThrow,
  getRdtOrThrow,
} from "@/app/_store/subscriptions";
import toast from "react-hot-toast";
import {
  ProgModal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/prog-animated-modal";
import Image from "next/image";
import { revalidateTwist } from "@/app/_actions/revalidate-twist";
import RadixMemeButton from "./RadixMemeButton";
import Loading from "./Loading";

const CreateCoinForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const tokenCreatorAddress = useAppSelector(
    (state) => state.user.selectedAccount.address
  );
  const [iconUrl, setIconUrl] = useState("");
  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [newComponentAddress, setNewComponentAddress] = useState("");

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(CreateCoinFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: FieldValues) {
    // Validate that user is logged in
    if (!tokenCreatorAddress) {
      toast.error("Please connect your wallet!");
      return;
    }

    setIsSubmitting(true);
    try {
      // Creates token, and returns the token resource address
      const addMappingPayload = await createToken(
        {
          name: data.name,
          symbol: data.ticker,
          iconUrl,
          description: data.description,
          telegram: data.telegramUrl,
          x: data.xUrl,
          website: data.website,
        },
        process.env.NEXT_PUBLIC_COMPONENT_ADDRESS || "",
        tokenCreatorAddress
      );

      const resourceAddress = addMappingPayload.resourceAddress;
      const componentAddress = addMappingPayload.token.componentAddress || "";
      setNewComponentAddress(componentAddress);
      // => open success modal
      setNewTokenAddress(resourceAddress);

      // request to server to revalidate /
      await revalidateTwist("/");
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong, could not create token! Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setImageIsUploading(true);
      const files = event.target.files; // Get the selected file(s)
      if (files && files.length > 0) {
        const iconUrl = (await uploadImage(files[0])) as string; // upload the first file
        setIconUrl(iconUrl);
      } else {
        console.log("No image selected");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setImageIsUploading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-sm:max-w-72 font-[family-name:var(--font-josefin-sans)]"
      >
        <div className="flex flex-col">
          <Label htmlFor="image">Image *</Label>
          <div className="relative">
            <Input
              type="file"
              id="image"
              {...register("image")}
              onChange={handleFileUpload} // Trigger upload on file selection
              className={`
                relative
                border-none
                cursor-pointer
                h-48

                after:absolute
                after:content-['+']
                ${
                  imageIsUploading
                    ? "after:text-transparent"
                    : "after:text-neutral-600"
                }
                after:top-1/2
                after:left-1/2
                after:-translate-x-1/2
                after:-translate-y-[42%]
                after:text-[16rem]

                hover:after:scale-105
              `}
            />
            {imageIsUploading && (
              <div className="absolute z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[42%]">
                <Loading />
              </div>
            )}
            {!imageIsUploading && iconUrl && (
              <Image
                src={iconUrl}
                alt={"uploaded image"}
                width={144}
                height={144}
                className="absolute z-50 bg-stone-800 bg-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-[42%]"
                style={{ width: "144px", height: "144px" }}
              />
            )}
          </div>
          {errors.image && (
            <span className="text-red-500">
              {(errors.image.message as string) || "Error"}
            </span>
          )}
          <p className="text-xs font-light mt-1">
            Only .jpeg, .jpg, and .png are allowed.
          </p>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="name">Name *</Label>
          <Input
            type="text"
            id="name"
            placeholder="E.G.: Meme token"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500">
              {(errors.name.message as string) || "Error"}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="name">Ticker *</Label>
          <Input
            type="text"
            id="symbol"
            placeholder="E.G.: MEME"
            {...register("ticker")}
          />
          {errors.ticker && (
            <span className="text-red-500">
              {(errors.ticker.message as string) || "Error"}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            placeholder="E.G.: A token created to celebrate the meme culture around the crypto world"
            {...register("description")}
            maxLength={DESCRIPTION_MAX_CHAR_COUNT}
          />
          <span className="text-sm text-right text-white text-opacity-50">
            {watch("description")?.length ?? 0}/{DESCRIPTION_MAX_CHAR_COUNT}{" "}
            characters
          </span>
          {errors.description && (
            <span className="text-red-500">
              {(errors.description.message as string) || "Error"}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            type="text"
            id="website"
            placeholder="https://"
            {...register("website")}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="twitter">X profile (optional)</Label>
          <Input
            type="text"
            id="twitter"
            placeholder="https://x.com/your-token"
            {...register("xUrl")}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="telegram">Telegram (optional)</Label>
          <Input
            type="text"
            id="telegram"
            placeholder="https://t.me/your-token"
            {...register("telegramUrl")}
          />
        </div>
        <RadixMemeButton
          type="submit"
          disabled={isSubmitting}
          text="Launch your token!"
          icon={<HiMiniRocketLaunch />}
          className="my-4"
        />
      </form>
      <SuccessModal
        newTokenAddress={newTokenAddress}
        newComponentAddress={newComponentAddress}
      />
    </div>
  );
};

export default CreateCoinForm;

const SuccessModal = ({
  newTokenAddress,
  newComponentAddress,
}: {
  newTokenAddress: string;
  newComponentAddress: string;
}) => {
  return (
    <div>
      <ProgModal>
        <ModalTrigger tokenHasAddress={!!newTokenAddress} />
        <ModalBody>
          <ModalContent
            href={`/token/${newTokenAddress}?componentAddress=${newComponentAddress}`}
          />
        </ModalBody>
      </ProgModal>
    </div>
  );
};

interface ResourceComponentMapping {
  resourceAddress: string;
  token: TokenInfo;
}

/** Helpers */
// create token TX
const createToken = async (
  token: TokenInfo,
  memetokensComponentAddress: string,
  tokenCreator: string
): Promise<ResourceComponentMapping> => {
  // Get transaction manifest
  const launchTxManifest = launchTokenTxManifest(
    token,
    memetokensComponentAddress,
    tokenCreator
  );
  // Creat TX and send to wallet
  const rdt = getRdtOrThrow();
  const transactionResult = await rdt.walletApi.sendTransaction({
    transactionManifest: launchTxManifest,
  });
  if (!transactionResult.isOk()) {
    throw new Error("Transaction failed");
  }
  const txId = transactionResult.value.transactionIntentHash;
  // Get resource address from gateway API
  const gatewayApiClient = getGatewayApiClientFromScratchOrThrow();
  const txDetails = await gatewayApiClient.transaction.getCommittedDetails(
    txId
  );
  if (
    !txDetails.transaction.affected_global_entities ||
    txDetails.transaction.affected_global_entities.length <= 4
  ) {
    throw new Error(
      "Invalid response from getCommitmentDetails API call: affected_global_entities not set or too few entities found."
    );
  }
  // Save resource -> component mapping in redux state
  const resourceAddress = txDetails.transaction.affected_global_entities[4];
  const componentAddress = txDetails.transaction.affected_global_entities[2];
  token.componentAddress = componentAddress;
  return {
    resourceAddress,
    token,
  };
};

// upload image to pinata/ipfs
const uploadImage = async (file: File) => {
  try {
    if (!file) {
      alert("No file selected");
      return;
    }

    const data = new FormData();
    data.set("image", file);
    const response = await createPinataUrl(data);

    if (response.status !== "success") {
      throw new Error("Could not create image url");
    }

    return response.ipfsUrl;
  } catch (err) {
    console.log(err);
    throw new Error("Could not create image url");
  }
};

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
              radial-gradient(
                ${
                  visible ? radius + "px" : "0px"
                } circle at ${mouseX}px ${mouseY}px,
                var(--blue-500),
                transparent 80%
              )
            `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-stone-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent
                    file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
                    focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                    disabled:cursor-not-allowed disabled:opacity-50
                    dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                    group-hover/input:shadow-none transition duration-400
                 `,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      const { left, top } = currentTarget.getBoundingClientRect();

      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
      <motion.div
        style={{
          background: useMotionTemplate`
              radial-gradient(
                ${
                  visible ? radius + "px" : "0px"
                } circle at ${mouseX}px ${mouseY}px,
                var(--blue-500),
                transparent 80%
              )
            `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <textarea
          className={cn(
            `flex h-32 w-full border-none bg-gray-50 dark:bg-stone-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent
                    file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600
                    focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
                    disabled:cursor-not-allowed disabled:opacity-50
                    dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
                    group-hover/input:shadow-none transition duration-400
                 `,
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Textarea.displayName = "Textarea";
