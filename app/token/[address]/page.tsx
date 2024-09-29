import { Metadata } from "next";
import { Suspense } from "react";
import TokenDetailsGetDataWrapper from "@/components/TokenDetailsGetDataWrapper";
import { TokenDetailsSkeleton } from "@/components/TokenDetails";

type TProps = {
  params: {
    address: string;
  };
  searchParams?: { [key: string]: string };
};

export const metadata: Metadata = {
  title: `Radix.Meme | Token`,
  description: "The first meme fair launch platform on Radix",
};

// Server component
const tokenDetails = ({ searchParams }: TProps) => {
  return (
    <div className="px-8 sm:px-20">
      <Suspense fallback={<TokenDetailsSkeleton />}>
        {/* Server component */}
        <TokenDetailsGetDataWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default tokenDetails;
