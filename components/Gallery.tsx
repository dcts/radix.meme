"use client";

import { useState, useEffect, useCallback } from "react";
import { CoinCard2, CoinCardSkeleton } from "./CoinCard";
import type { TTokenData } from "@/types";
import { devCoinsData } from "@/data";
import { wait } from "@/utils";

const Gallery = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [coinsData, setCoinsData] = useState<TTokenData[]>(devCoinsData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // fetch all coins on chain data
  const getCoinData = useCallback(async () => {}, []);

  useEffect(() => {
    (async () => {
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
    <div className="flex flex-wrap place-content-baseline	max-w-8xl gap-8 my-8 mt-20">
      {isLoading
        ? Array.from({ length: 12 }, (_, idx) => {
            return <CoinCardSkeleton key={idx} />;
          })
        : coinsData.map((coin) => {
            return <CoinCard2 key={coin.id} coin={coin} />;
          })}
    </div>
  );
};

export default Gallery;
