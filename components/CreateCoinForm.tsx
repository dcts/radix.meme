"use client";

import React, {
  useState,
  forwardRef,
  InputHTMLAttributes,
  useRef,
} from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateCoinFormSchema,
  DESCRIPTION_MAX_CHAR_COUNT,
  TOKEN_MAX_CHAR_COUNT,
} from "@/app/_zod";
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
import { FaRegTrashAlt } from "react-icons/fa";

const CreateCoinForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const tokenCreatorAddress = useAppSelector(
    (state) => state.user.selectedAccount.address
  );
  const [iconUrl, setIconUrl] = useState("");
  const [newTokenAddress, setNewTokenAddress] = useState("");
  const [newComponentAddress, setNewComponentAddress] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showSocials, setShowSocials] = useState(false);

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

  const handleCloseIconClick = () => {
    setIconUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSocials = () => {
    setShowSocials((prev) => !prev);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-body flex flex-col gap-6"
      >
        <div className="flex flex-col text-center mt-6 text-sm gap-1">
          <Label htmlFor="image">Token image *</Label>
          <div className="relative z-50 !w-[96px] flex justify-center mx-auto">
            <Input
              type="file"
              id="image"
              {...register("image")}
              onChange={handleFileUpload} // Trigger upload on file selection
              ref={(e) => {
                fileInputRef.current = e;
                register("image").ref(e);
              }}
              className={`
                flex
                justify-center
                mx-auto
                border-none
                cursor-pointer
                h-[96px]
                w-[96px]
                bg-radix-meme-grey-500
                after:absolute
                after:content-['+'] after:scale-75
                after:text-[4rem]
                after:font-bold
                after:text-radix-meme-grey-600

                ${
                  imageIsUploading
                    ? "after:text-transparent"
                    : "after:text-neutral-600"
                }
                after:top-1/2
                after:left-1/2
                after:-translate-x-1/2
                after:-translate-y-[95%]
                after:text-[8rem]

                hover:after:scale-90
              `}
            />
            {iconUrl && (
              <button
                className="absolute top-2 right-2 p-1 rounded-full shadow-md z-50"
                onClick={handleCloseIconClick}
              >
                <FaRegTrashAlt />
              </button>
            )}
            {imageIsUploading && (
              <div className="absolute z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[42%]">
                <Loading />
              </div>
            )}
            {!imageIsUploading && iconUrl && (
              <Image
                src={iconUrl}
                alt={"uploaded image"}
                width={96}
                height={96}
                className="absolute bg-radix-meme-grey-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] object-cover border rounded-md z-0"
                style={{ width: "96px", height: "96px" }}
              />
            )}
          </div>

          {errors.image && (
            <span className="text-red-500">
              {(errors.image.message as string) || "Error"}
            </span>
          )}
          <p className="text-xs mt-1 text-radix-meme-grey-200">
            .jpeg, .jpg, or .png
          </p>
        </div>
        <div className="text-sm gap-6 flex flex-col">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
              <Label htmlFor="name">Token name *</Label>
              <span className="text-right text-radix-meme-grey-200">
                {watch("name")?.length ?? 0}/{TOKEN_MAX_CHAR_COUNT}
              </span>
            </div>
            <Input
              type="text"
              id="name"
              placeholder="E.G.: Memecoin"
              maxLength={TOKEN_MAX_CHAR_COUNT}
              className="placeholder:text-radix-meme-grey-600"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500">
                {(errors.name.message as string) || "Error"}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
              <Label htmlFor="name">Token ticker *</Label>
              <span className="text-right text-radix-meme-grey-200">
                {watch("ticker")?.length ?? 0}/{TOKEN_MAX_CHAR_COUNT}
              </span>
            </div>
            <Input
              type="text"
              id="symbol"
              placeholder="E.G.: MEME"
              maxLength={TOKEN_MAX_CHAR_COUNT}
              className="placeholder:text-radix-meme-grey-600"
              {...register("ticker")}
            />
            {errors.ticker && (
              <span className="text-red-500">
                {(errors.ticker.message as string) || "Error"}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
              <Label htmlFor="description">Description (optional)</Label>
              <span className="text-radix-meme-grey-200">
                {watch("description")?.length ?? 0}/{DESCRIPTION_MAX_CHAR_COUNT}
              </span>
            </div>
            <Textarea
              id="description"
              placeholder="E.g.: A token designed to honor and embrace the meme culture within the crypto community."
              maxLength={DESCRIPTION_MAX_CHAR_COUNT}
              className="placeholder:text-radix-meme-grey-600"
              {...register("description")}
            />
            {errors.description && (
              <span className="text-red-500">
                {(errors.description.message as string) || "Error"}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          className="flex text-center justify-center gap-x-2 px-8 py-2 sm:h-11 border border-almost-white border-b-4 border-b-almost-white rounded-lg font-title uppercase text-almost-white font-normal bg-dexter-gray-c"
          onClick={handleSocials}
        >
          + Add social links
        </button>

        {showSocials && (
          <div className="space-y-6 text-sm">
            <div className="flex flex-col gap-1">
              <Label htmlFor="website">Website (optional)</Label>
              <Input
                type="text"
                id="website"
                placeholder="https://"
                className="placeholder:text-radix-meme-grey-600"
                {...register("website")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="twitter">X profile (optional)</Label>
              <Input
                type="text"
                id="twitter"
                placeholder="https://x.com/your-token"
                className="placeholder:text-radix-meme-grey-600"
                {...register("xUrl")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="telegram">Telegram (optional)</Label>
              <Input
                type="text"
                id="telegram"
                placeholder="https://t.me/your-token"
                className="placeholder:text-radix-meme-grey-600"
                {...register("telegramUrl")}
              />
            </div>
          </div>
        )}
        <RadixMemeButton
          type="submit"
          disabled={isSubmitting}
          text="Launch!"
          className="my-4 mt-2"
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
            `flex h-10 w-full border-none bg-gray-50 dark:bg-radix-meme-grey-500 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent
                    file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-radix-meme-grey-200
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
            `flex h-32 w-full border-none bg-gray-50 dark:bg-radix-meme-grey-500 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent
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
