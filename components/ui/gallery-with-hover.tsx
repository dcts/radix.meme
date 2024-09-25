"use client";

import { devCoinsData } from "@/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Card, CardSkeleton } from "../Card";
import { TTokenData } from "@/types";
import { wait } from "@/utils";

type TProps = {
  className?: string;
};

export const GalleryWithHover = ({ className }: TProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [coinsData, setCoinsData] = useState<TTokenData[]>(devCoinsData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // fetch all coins on chain data
  const getCoinData = useCallback(async () => {}, []);

  useEffect(() => {
    (async () => {
      // TODO remove transient
      await wait(2000);
      try {
        setIsLoading(true);
        setIsError(false);
        // TODO
        // const response = (await getCoinData()) as unknown as TTokenData[];
        // setCoinsData(response);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getCoinData]);

  if (isError) {
    // TODO
  }

  return (
    <div className="mt-[10rem] py-12">
      <h1 className="font-[family-name:var(--font-londrina-solid)] text-6xl flex justify-center">
        Last Tokens
      </h1>
      <div
        className={cn(
          "flex flex-wrap items-stretch max-md:place-content-center py-10 font-[family-name:var(--font-josefin-sans)] justify-center",
          className
        )}
      >
        {isLoading
          ? Array.from({ length: 12 }, (_, idx) => {
              return <CardSkeleton key={idx} />;
            })
          : coinsData.map((coin, idx) => (
              <Link
                href={`/token/${coin?.address}`}
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

                <Card coin={coin} />
              </Link>
            ))}
      </div>
    </div>
  );
};
