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
      className="bg-radix-meme-grey-100 rounded-lg h-[222px] border-2 border-radix-meme-grey-200 hover:border-dexter-green p-4"
    >
      <div className="flex flex-row">
        <Image
          src={coin.iconUrl || ""}
          alt={coin.name || ""}
          width={100}
          height={100}
          className="object-cover w-[100px] h-[100px] rounded-lg rounded-br-none"
        />
        <div className="flex flex-col ml-4">
          <div className="flex flex-row font-title text-xl gap-1">
            <p className=" text-dexter-green-OG">{coin.name} </p>
            <p className="">({coin.symbol})</p>
          </div>
          <div className="font-body text-xs mt-1">
            <div className="flex flex-row gap-4">
              <div>
                <p>@creator</p>
              </div>
              <div>
                <p>2 days ago</p>
              </div>
            </div>
            <div>
              <p className="mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque interdum rutrum sodales. Nullam mattis fermentum
                libero, non volutpat.
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <div className="font-title flex flex-row justify-between text-xl mt-2">
          <p>Market Cap:</p>
          <p>0 / 100k XRD (0%)</p>
        </div>
        <div>
          <p className="text-xs">Line</p>
        </div>
        <div className="flex flex-row justify-evenly font-title gap-1">
          <p className="flex-grow border border-1 solid bg-radix-meme-grey-300 px-6 py-1 text-center">
            56
          </p>
          <p className="flex-grow border border-1 solid bg-radix-meme-grey-300 px-6 py-1 text-center">
            9.5 XRD
          </p>
          <p className="flex-grow border border-1 solid bg-radix-meme-grey-300 px-6 py-1 text-center">
            0.0062 XRD
          </p>
        </div>
      </div>
    </Link>
  );
};

export const CoinCardSkeleton = () => {
  // TODO
  return <></>;
};
