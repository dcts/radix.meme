"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCoinInputSchema } from "@/app/_zod";
import { createCoinAction } from "@/app/_actions/createCoinAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { HiMiniRocketLaunch } from "react-icons/hi2";

// TODO display validation errors
// TODO set submit btn disabled state

const CreateCoinForm = () => {
  const {
    register,
    formState: {
      // errors
    },
  } = useForm({
    resolver: zodResolver(CreateCoinInputSchema),
  });

  return (
    <form action={createCoinAction} className="flex flex-col gap-6">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="image">Image *</Label>
        <Input id="image" type="file" {...register("image")} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name *</Label>
        <Input
          type="name"
          id="name"
          placeholder="E.G.: Meme token"
          {...register("name")}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Ticker *</Label>
        <Input
          type="symbol"
          id="symbol"
          placeholder="E.G.: MEME"
          {...register("symbol")}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="E.G.: A token created to celebrate the meme culture around the crypto world"
          {...register("description")}
        />
        <span className="text-sm text-right">16/140 characters</span>
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="website">Website</Label>
        <Input
          type="text"
          id="website"
          placeholder="https://"
          {...register("website")}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="twitter">X profile</Label>
        <Input type="text" id="twitter" placeholder="@" {...register("xUrl")} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="telegram">Telegram</Label>
        <Input
          type="text"
          id="telegram"
          placeholder="@"
          {...register("telegramUrl")}
        />
      </div>

      <span>Attention: Coin data cannot be changed after creation</span>
      <Button
        type="submit"
        className="btn bg-dexter-gradient-green/80 hover:bg-dexter-gradient-green
        w-full self-center flex items-center text-2xl"
      >
        <HiMiniRocketLaunch />
        <span className="ms-4 font-bold">Launch your token</span>
      </Button>
    </form>
  );
};

export default CreateCoinForm;
