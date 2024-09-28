"use client";

import { useState, forwardRef, InputHTMLAttributes } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCoinFormSchema } from "@/app/_zod";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { createPinataUrl } from "@/app/_actions/create-pinata-url";
import { TokenInfo, tokenStoreSlice } from "@/app/_store/tokenStoreSlice";
import { launchTokenTxManifest } from "@/utils/tx-utils";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import {
  getGatewayApiClientFromScratchOrThrow,
  getRdtOrThrow,
} from "@/app/_store/subscriptions";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

import {
  ProgModal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/prog-animated-modal";
import successRaccoon from "../public/success-raccoon.svg";
import Image from "next/image";
import Link from "next/link";

const MAX_CHAR_COUNT = 140;

const CreateCoinForm = () => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    mode: "onChange",
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
      console.log(resourceAddress);

      // Dispatch event to store resource->component matching
      dispatch(tokenStoreSlice.actions.addMapping(addMappingPayload));

      // => open success modal
      setNewComponentAddress(addMappingPayload.token.componentAddress || "");
      setNewTokenAddress(addMappingPayload.resourceAddress);

      // purge cached data on / page : https://nextjs.org/docs/app/api-reference/functions/revalidatePath
      revalidatePath("/");
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
    const files = event.target.files; // Get the selected file(s)
    if (files && files.length > 0) {
      const iconUrl = (await uploadImage(files[0])) as string; // upload the first file
      setIconUrl(iconUrl);
    } else {
      console.log("No image selected");
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
          <Input
            type="file"
            id="image"
            {...register("image")}
            onChange={handleFileUpload} // Trigger upload on file selection
            className="file-input-with-big-plus"
          />
          {errors.image && (
            <span className="text-red-500">
              {(errors.image.message as string) || "Error"}
            </span>
          )}
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
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="E.G.: A token created to celebrate the meme culture around the crypto world"
            {...register("description")}
            maxLength={MAX_CHAR_COUNT}
          />
          <span className="text-sm text-right text-white text-opacity-50">
            {watch("description")?.length ?? 0}/{MAX_CHAR_COUNT} characters
          </span>
          {errors.description && (
            <span className="text-red-500">
              {(errors.description.message as string) || "Error"}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <Label htmlFor="website">Website</Label>
          <Input
            type="text"
            id="website"
            placeholder="https://"
            {...register("website")}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="twitter">X profile</Label>
          <Input
            type="text"
            id="twitter"
            placeholder="@"
            {...register("xUrl")}
          />
        </div>

        <div className="flex flex-col">
          <Label htmlFor="telegram">Telegram</Label>
          <Input
            type="text"
            id="telegram"
            placeholder="@"
            {...register("telegramUrl")}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn bg-dexter-gradient-green/80 hover:bg-dexter-gradient-green
                  w-full self-center flex items-center text-2xl my-4"
        >
          <HiMiniRocketLaunch />
          <span className="ms-2 font-bold text-sm">Launch your token</span>
        </Button>
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
          <ModalContent>
            <div className="flex flex-col font-[family-name:var(--font-josefin-sans)">
              <div>
                <Image
                  src={successRaccoon}
                  alt="success-raccoon"
                  width={600}
                  height={600}
                  className="animate-float"
                />
              </div>
              <div>
                <h4 className="text-xl md:text-6xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-2 mt-4 uppercase">
                  Token created!
                </h4>
              </div>
              <div className="flex justify-center max-auto mt-4 mb-4">
                <Link
                  href={`/token/${newTokenAddress}?componentAddress=${newComponentAddress}`}
                  className="flex justify-center max-auto gap-2 bg-dexter-green-OG/90 hover:bg-dexter-gradient-green w-fit rounded-lg text-dexter-grey-light px-8 py-2 max-lg:self-center shadow-md shadow-dexter-green-OG transition duration-300"
                >
                  <span className="font-normal text-lg">
                    Now pump your token!
                  </span>
                </Link>
              </div>
            </div>
          </ModalContent>
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
