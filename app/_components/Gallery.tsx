"use client";

import { useState, useEffect, useCallback } from "react";
import CoinCard, { CoinCardSkeleton } from "./CoinCard";
import type { TTokenData } from "@/types";

const devCoinsData: TTokenData[] = [
  {
    id: "1",
    address: "00Xcoin",
    name: "coin01",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "",
    description: "",
  },
  {
    id: "2",
    address: "00Xcoin",
    name: "coin02",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "",
    description: "",
  },
  {
    id: "3",
    address: "00Xcoin",
    name: "coin03",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "",
    description: "",
  },
  {
    id: "4",
    address: "00Xcoin",
    name: "coin04",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "",
    description: "",
  },
  {
    id: "5",
    address: "00Xcoin",
    name: "coin05",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "",
    description: "",
  },
  {
    id: "6",
    address: "00Xcoin",
    name: "coin06",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "",
    description: "",
  },
];

const Gallery = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [coinsData, setCoinsData] = useState<TTokenData[]>(devCoinsData);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // fetch all coins on chain data
  const getCoinData = useCallback(async () => {}, []);

  useEffect(() => {
    (async () => {
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
    <div className="flex flex-wrap max-w-6xl gap-8">
      {isLoading
        ? Array.from({ length: 12 }, (_, idx) => {
            return <CoinCardSkeleton key={idx} />;
          })
        : coinsData.map((coin) => {
            return <CoinCard key={coin.id} coin={coin} />;
          })}
    </div>
  );
};

export default Gallery;
