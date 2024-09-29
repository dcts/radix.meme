import TokenDetails from "@/components/TokenDetails";
import { getTokenData } from "@/utils/api-calls";
import { Metadata } from "next";

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
const tokenDetails = async ({ searchParams }: TProps) => {
  const componentAddressSearchParam = searchParams?.componentAddress;

  const componentAddress = Array.isArray(componentAddressSearchParam)
    ? componentAddressSearchParam[0]
    : componentAddressSearchParam;
  if (!componentAddress) {
    throw new Error("Invalid component address");
  }
  const tokenData = await getTokenData(componentAddress);

  return (
    <div className="px-8 sm:px-20">
      {/* Client component */}
      <TokenDetails tokenData={tokenData} />
    </div>
  );
};

export default tokenDetails;
