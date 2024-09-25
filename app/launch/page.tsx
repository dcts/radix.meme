import CreateCoinForm from "@/components/CreateCoinForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeXter Launchpad | Launch",
  description: "The first meme fair launch platform on Radix",
};

const page = () => {
  return (
    <div className="font-[family-name:var(--font-londrina-solid)] sm:px-20">
      <h1 className="mb-8 text-center max-w-sm text-4xl font-black">
        Create your token
      </h1>
      <CreateCoinForm />
    </div>
  );
};

export default page;
