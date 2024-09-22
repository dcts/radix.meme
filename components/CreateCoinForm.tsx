"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCoinInputSchema } from "../_zod";
import { createCoinAction } from "../_actions/createCoinAction";

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
      <label className="input input-bordered flex items-center gap-2">
        Name
        <input type="text" className="grow" {...register("name")} />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        Symbol
        <input type="text" className="grow" {...register("symbol")} />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        Description
        <input type="text" className="grow" {...register("description")} />
      </label>

      <input
        type="file"
        {...register("image")}
        className="file-input file-input-bordered w-full max-w-xs"
      />

      <label className="input input-bordered flex items-center gap-2">
        Telegram
        <input type="text" className="grow" {...register("telegramUrl")} />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        X
        <input type="text" className="grow" {...register("xUrl")} />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        Website
        <input type="text" className="grow" {...register("website")} />
      </label>

      <button type="submit" className="btn btn-outline w-full self-center">
        Create
      </button>
    </form>
  );
};

export default CreateCoinForm;
