"use client";

import * as React from "react";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCoinInputSchema } from "@/app/_zod";
import { createCoinAction } from "@/app/_actions/createCoinAction";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { HiMiniRocketLaunch } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
// import { FileUpload } from "@/components/ui/file-upload";

// TODO display validation errors
// TODO set submit btn disabled state

const MAX_CHAR_COUNT = 140;

const CreateCoinForm = () => {
  // const [descriptionLength, setDescriptionLength] = React.useState("");
  // const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    // setValue,
    formState: { errors },
    // watch,
    // trigger,
  } = useForm({
    resolver: zodResolver(CreateCoinInputSchema),
    // mode: "onChange",
  });

  return (
    <form
      action={createCoinAction}
      className="flex flex-col gap-6 max-w-sm font-[family-name:var(--font-josefin-sans)]"
    >
      <div className="grid items-center gap-1.5">
        <Label htmlFor="image">Image *</Label>
        <input type="file" {...register("image")}></input>
        {/* <FileUpload
          {...register("image")}
          onChange={(uploadedFiles) => {
            console.log(uploadedFiles);
            setFiles(uploadedFiles);
            setValue("image", uploadedFiles[0]);
            // trigger("image");
          }}
        /> */}
        {/* {files.length > 0 && ( // <-- Added this block
          <div className="text-sm text-gray-600">
            Uploaded files: {files.map((file) => file.name).join(", ")}
          </div>
        )}
        {errors.image && (
          <span className="text-red-500">
            {(errors.image.message as string) || "Error"}
          </span>
        )} */}
      </div>

      <div className="grid items-center gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input
          type="name"
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

      <div className="grid items-center gap-1.5">
        <Label htmlFor="name">Ticker *</Label>
        <Input
          type="symbol"
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

      <div className="grid items-center gap-1.5">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="E.G.: A token created to celebrate the meme culture around the crypto world"
          {...register("description")}
          maxLength={MAX_CHAR_COUNT}
        />
        {/* <span className="text-sm text-right text-white text-opacity-50">
          {descriptionLength}/{MAX_CHAR_COUNT} characters
        </span> */}
        {errors.description && (
          <span className="text-red-500">
            {(errors.description.message as string) || "Error"}
          </span>
        )}
      </div>

      <div className="grid items-center gap-1.5">
        <Label htmlFor="website">Website</Label>
        <Input
          type="text"
          id="website"
          placeholder="https://"
          {...register("website")}
        />
      </div>

      <div className="grid items-center gap-1.5">
        <Label htmlFor="twitter">X profile</Label>
        <Input type="text" id="twitter" placeholder="@" {...register("xUrl")} />
      </div>

      <div className="grid items-center gap-1.5">
        <Label htmlFor="telegram">Telegram</Label>
        <Input
          type="text"
          id="telegram"
          placeholder="@"
          {...register("telegramUrl")}
        />
      </div>

      <span className="text-white/80 text-xs">
        Attention: Coin data cannot be changed after creation
      </span>
      <Button
        type="submit"
        className="btn bg-dexter-gradient-green/80 hover:bg-dexter-gradient-green
        w-full self-center flex items-center text-2xl"
      >
        <HiMiniRocketLaunch />
        <span className="ms-2 font-bold text-sm">Launch your token</span>
      </Button>
    </form>
  );
};

export default CreateCoinForm;

// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

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
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
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
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent
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

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

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
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
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
            `flex h-32 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent
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
