import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import type { TTokenData } from "@/types";

export const CoinCard = ({ coin }: { coin: TTokenData }) => {
  const hasLastPrice = !!coin.lastPrice;

  return (
    <div className="bg-red-900 h-[222px] min-w-[400px] max-w-[475px] flex-grow">
      test token
    </div>
  );
};

export const CoinCardSkeleton = () => {
  return <div className=""></div>;
};
