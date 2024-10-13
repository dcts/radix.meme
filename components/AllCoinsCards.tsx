"use client";

import Image from "next/image";
import Link from "next/link";
import type { TTokenData } from "@/types";
import { Progress } from "@/components/ui/progress";
import { IoTimeOutline } from "react-icons/io5";

type TProps = {
  allCoinsData: TTokenData[];
};

// client-component
const AllCoinsCards = ({ allCoinsData }: TProps) => {
  return (
    // <div className="font-body w-full flex flex-wrap justify-center p-6 gap-4">
    <div className="font-body w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 p-6">
      {allCoinsData?.map((coin) => (
        <CoinCard coin={coin} key={coin?.address} />
      ))}
    </div>
  );
};

export default AllCoinsCards;

const CoinCard = ({ coin }: { coin: TTokenData }) => {
  // const hasLastPrice = !!coin.lastPrice;
  return (
    <Link
      href={`/token/${coin?.address}?componentAddress=${coin.componentAddress}`}
      key={coin?.address}
      className="bg-radix-meme-grey-100 rounded-lg h-[200px] w-[450px] border-2 border-radix-meme-grey-200 hover:border-dexter-green p-4"
    >
      <div className="flex flex-row">
        <Image
          src={coin.iconUrl || ""}
          alt={coin.name || ""}
          width={80}
          height={80}
          className="object-cover w-[80px] h-[80px] rounded-lg rounded-br-none"
        />
        <div className="flex flex-col ml-4">
          <div className="flex flex-row font-title text-2xl gap-1">
            <p className="text-dexter-green-OG">{coin.name} </p>
            <p>(${coin.symbol})</p>
          </div>
          <div className="font-body text-sm mt-1">
            <div>
              <p className="text-radix-meme-grey-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque ...
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="font-title flex flex-row justify-between text-xl mt-3">
          <p>Market cap:</p>
          <div className="flex flex-row gap-1">
            <p>0 / 100k XRD</p>
            <p className="text-dexter-green-OG">(0%)</p>
          </div>
        </div>
        <div className="mt-1">
          <Progress />
        </div>
        <div className="flex flex-row justify-between gap-1 mt-2 font-body text-sm">
          <div className="flex flex-row gap-1 justify-center flex-grow px-4 py-1">
            <div className="flex items-center">
              <IoTimeOutline />
            </div>
            <p>2 d</p>
          </div>
          <div className="flex flex-row flex-grow px-4 py-1 justify-center gap-1">
            <p className="font-bold">97</p>
            <p className="text-radix-meme-grey-400">Holders</p>
          </div>
          <div className="flex flex-row px-4 py-1 gap-1 text-center">
            <p className="font-bold">9.5K XRD</p>
            <p className="text-radix-meme-grey-400">24h Vol.</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const CoinCardSkeleton = () => {
  // TODO
  return <></>;
};

// name: data.name,
// symbol: data.ticker,
// iconUrl,
// description: data.description,
// telegram: data.telegramUrl,
// x: data.xUrl,
// website: data.website,
