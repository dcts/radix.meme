import { getTokenData } from "@/utils/api-calls";
import TokenDetails from "@/components/TokenDetails";
import { notFound } from "next/navigation";

type TProps = {
  searchParams?: { [key: string]: string };
};

const TokenDetailsGetDataWrapper = async ({ searchParams }: TProps) => {
  const componentAddressSearchParam = searchParams?.componentAddress;

  const componentAddress = Array.isArray(componentAddressSearchParam)
    ? componentAddressSearchParam[0]
    : componentAddressSearchParam;

  if (!componentAddress) {
    // throw new Error("Invalid component address");
    notFound();
  }

  const tokenData = await getTokenData(componentAddress);

  if (!tokenData?.address) {
    notFound();
  }

  // client-component
  return <TokenDetails tokenData={tokenData} />;
};

export default TokenDetailsGetDataWrapper;
