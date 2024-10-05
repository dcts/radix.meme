import React from "react";
import CreateCoinForm from "@/components/CreateCoinForm";
import { SparklesCore } from "@/components/ui/sparkles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DeXter Launchpad | Launch",
  description: "The first meme fair launch platform on Radix",
};

const page = () => {
  return (
    <>
      <div className="w-full absolute -z-10 inset-0 min-h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="bg-[#141414] py-4 rounded-md font-[family-name:var(--font-londrina-solid)] max-sm:px-4 sm:px-20 mb-8">
        <h1 className="mb-8 text-center max-w-sm text-4xl font-black">
          Create your token
        </h1>
        <CreateCoinForm />
      </div>
    </>
  );
};

export default page;
