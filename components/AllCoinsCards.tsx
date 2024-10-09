"use client";

import Image from "next/image";
// import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
// import { CoinCard } from "./CoinCard";
// import { useState } from "react";
import type { TTokenData } from "@/types";

type TProps = {
  allCoinsData: TTokenData[];
};

// client-component
const AllCoinsCards = ({ allCoinsData }: TProps) => {
  return (
    // <div className="font-body w-full flex flex-wrap justify-center p-6 gap-4">
    <div className="font-body w-full grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4 p-6">
      {allCoinsData?.map((coin, idx) => (
        <Link
          href={`/token/${coin?.address}?componentAddress=${coin.componentAddress}`}
          key={coin?.address}
          className="bg-radix-meme-grey-100 rounded-lg h-[222px] border-2 border-radix-meme-grey-200 hover:border-dexter-green"
          // onMouseEnter={() => setHoveredIndex(idx)}
          // onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-dexter-gradient-blue/10 block  rounded-3xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence> */}

          {/* <CoinCardDeprecated coin={coin} /> */}
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
