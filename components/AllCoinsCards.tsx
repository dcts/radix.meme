"use client";

import Image from "next/image";
import Link from "next/link";
import type { TTokenData } from "@/types";

type TProps = {
  allCoinsData: TTokenData[];
};

// client-component
const AllCoinsCards = ({ allCoinsData }: TProps) => {
  return (
    // <div className="font-body w-full flex flex-wrap justify-center p-6 gap-4">
    <div className="font-body w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 p-6">
      {allCoinsData?.map((coin) => (
        <Link
          href={`/token/${coin?.address}?componentAddress=${coin.componentAddress}`}
          key={coin?.address}
          className="bg-radix-meme-grey-100 rounded-lg h-[222px] border-2 border-radix-meme-grey-200 hover:border-dexter-green"
        >
          <CoinCard coin={coin} />
        </Link>
      ))}
    </div>
  );
};

export default AllCoinsCards;

const CoinCard = ({ coin }: { coin: TTokenData }) => {
  // const hasLastPrice = !!coin.lastPrice;
  return (
    <div className="font-title px-4 py-3">
      <p className="text-lg">
        {coin.name} ({coin.symbol})
      </p>
      <Image
        src={coin.iconUrl || ""}
        alt={coin.name || ""}
        width={100}
        height={100}
        className="object-cover w-[100px] h-[100px] rounded-lg rounded-br-none"
      />
    </div>
  );
};

export const CoinCardSkeleton = () => {
  return <div className=""></div>;
};
