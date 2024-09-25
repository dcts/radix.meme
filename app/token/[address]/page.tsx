import TokenDetails from "@/components/TokenDetails";
import { Metadata } from "next";

type TProps = {
  params: {
    address: string;
  };
};

export const metadata: Metadata = {
  title: `Radix.Meme | Token`,
  description: "The first meme fair launch platform on Radix",
};

const page = async ({ params }: TProps) => {
  const { address } = params;

  return (
    <div className="px-8 sm:px-20">
      {/* <h1>Token details</h1> */}
      <TokenDetails tokenAddress={address} />
    </div>
  );
};

export default page;
