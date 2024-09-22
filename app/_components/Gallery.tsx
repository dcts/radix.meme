"use client";

import { useState, useEffect, useCallback } from "react";
import { CoinCard2, CoinCardSkeleton } from "./CoinCard";
import type { TTokenData } from "@/types";

const devCoinsData: TTokenData[] = [
  {
    id: "1",
    address: "THnDxamD9PELnaQ7K71TENuJsZL5ypUyEZ",
    name: "Ninja Tron",
    imageUrl:
      "https://cdn.sunpump.meme/public/logo/NINJA_TH9s5x_6JuBr85YPLLj.png",
    symbol: "NINJA",
    description:
      "Earn 5% daily with a 10-level affiliate bonus. Hold $NINJA to boost your interest to 10%! Built with love at ninja-tron.com 每天赚取5%的收益，还有10级推荐奖励。持有$NINJA，利率提升至10%！ 由ninja-tron.com倾心打造",
  },
  {
    id: "2",
    address: "TPcsPLi88dTDj1VLvJQD1xKEQ2HbggEgVu",
    name: "Aiko",
    imageUrl:
      "https://cdn.sunpump.meme/public/logo/AIKO_TBNprT_y4CKlTmMpqrE.jpeg",
    symbol: "AIKO",
    description:
      "私 $AIKO はNEIROとは異なります。NEIROのように実際に存在する犬ではありませんが、持続可能性があり、長い間、次世代の仮想通貨愛好家に愛されたいと願っています。",
  },
  {
    id: "3",
    address: "TYxewKScvXZxAGsAxj3abWiNA1vQ2aopxf",
    name: "Trump Coins",
    imageUrl:
      "https://cdn.sunpump.meme/public/logo/coins_TEzier_MWlwUyuZKFR0.gif",
    symbol: "COINS",
    description:
      "Hello everyone! I have something incredible to share today, as we are introducing the launch of our Official Trump Coins! TThe President Donald J. Trump First Edition Silver Medallion will be available starting Wednesday, 9/25/24",
  },
  {
    id: "4",
    address: "TFeizfyFQytXht4N1SLjFHkYEZ5bSVdsKh",
    name: "Sock",
    imageUrl:
      "https://cdn.sunpump.meme/public/logo/Sock_TADoHw_dU5rJyEAQoBu.jpeg",
    symbol: "SOCK",
    description:
      "If u wanna take $sock just take it !",
  },
  {
    id: "5",
    address: "TREutKMpuAXfZgbaJXVvCdSPSpNz4pzPDa",
    name: "SUNLV",
    imageUrl:
      "https://cdn.sunpump.meme/public/logo/SUNLV_TY1FDb_Qm2p0SqanUHq.jpg",
    symbol: "SUNLV",
    description:
      "SUNLV - Aiming to be the most expensive token on SunPump.",
  },
  {
    id: "6",
    address: "TQYmJDBuEbZJmagZpn3W8GDKDgnQmBSm9m",
    name: "MooTron",
    imageUrl:
      "https://cdn.sunpump.meme/public/logo/MooTron_TLaggr_9jdLv09KcF35.webp",
    symbol: "MooTron",
    description:
      "For all the three cute Moos, MooDeng, MooWang, MooToon",
  },
  {
    id: "7",
    address: "TX9XtfxoWdhnekKodehNd6JFnKrSbEg2fz",
    name: "Jawstin Sun",
    imageUrl:
      "https://cdn.sunpump.meme/public/logo/JAWSTIN_TH5QRr_anCQHPeGRxg6.jpg",
    symbol: "JAWSTIN",
    description:
      "$JAWSTIN is a meme brand inspired by Justin Sun. Our ambition is to become one of the most recognized meme brand on TRON blockchain.",
  },
  {
    id: "8",
    address: "TXakuBojTkJpcKN9MtPkGYbbYqf4eq5WmU",
    name: "DANCING ZOMBIE",
    imageUrl:
      "https://cdn.sunpump.meme/public/logo/DANCINGZ_TPiYgb_iGMViR0fmxrG.png",
    symbol: "DANCINGZ",
    description:
      "Dancing Zombie ($DANCINGZ) is the most fun and spooky coin on the Tron blockchain. Inspired by undead creatures that just can't stop moving, this memecoin is here to shake up the crypto space.",
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
