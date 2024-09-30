"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CoinCard } from "./CoinCard";
import { useState } from "react";
import type { TTokenData } from "@/types";

type TProps = {
  allCoinsData: TTokenData[];
};

// client-component
const AllCoinsCards = ({ allCoinsData }: TProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return allCoinsData?.map((coin, idx) => (
    <Link
      href={`/token/${coin?.address}?componentAddress=${coin.componentAddress}`}
      key={coin?.address}
      className="relative group block p-2 h-full w-fit"
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
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
      </AnimatePresence>

      <CoinCard coin={coin} />
    </Link>
  ));
};

export default AllCoinsCards;