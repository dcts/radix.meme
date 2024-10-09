"use client";

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
    <div className="font-body w-full flex flex-wrap justify-center p-6 gap-4">
      {allCoinsData?.map((coin, idx) => (
        <Link
          href={`/token/${coin?.address}?componentAddress=${coin.componentAddress}`}
          key={coin?.address}
          className="bg-dexter-green rounded-lg h-[222px] min-w-[390px] lg:max-w-[475px] flex-1"
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
    <div className="font-title">
      <p>{coin.symbol}</p>
    </div>
  );
};

export const CoinCardSkeleton = () => {
  return <div className=""></div>;
};
