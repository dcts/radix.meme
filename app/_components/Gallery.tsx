"use client";

import { useState, useEffect, useCallback } from "react";
import CoinCard, { CoinCardSkeleton } from "./CoinCard";
import type { TTokenData } from "@/types";

const devCoinsData: TTokenData[] = [
  {
    id: "1",
    address: "00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin",
    name: "Stonks",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "STK",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    id: "2",
    address: "00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin",
    name: "Stonks",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "STK",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    id: "3",
    address: "00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin",
    name: "Stonks",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "STK",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    id: "4",
    address: "00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin",
    name: "Stonks",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "STK",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    id: "5",
    address: "00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin",
    name: "Stonks",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "STK",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
  {
    id: "6",
    address: "00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin00Xcoin",
    name: "Stonks",
    imageUrl:
      "https://fuchsia-dramatic-heron-401.mypinata.cloud/ipfs/bafkreibkjqljap7f5xebjshp6u3pm4p7z5ovsd7w4copcn56sicq4rez6i",
    symbol: "STK",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
  },
];

// transient
const wait = (duration: number) =>
  new Promise((res) => {
    setTimeout(res, duration);
  });

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
    <div className="flex flex-wrap place-content-center	max-w-8xl gap-8 my-8">
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
