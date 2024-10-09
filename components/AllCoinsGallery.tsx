import { cn } from "@/lib/utils";
import { Suspense } from "react";
import AllCoinsGetDataWrapper from "./AllCoinsGetDataWrapper";
import { CoinCardSkeleton } from "./CoinCard";

type TProps = {
  className?: string;
};

// server-component
export const AllCoinsGallery = ({ className }: TProps) => {
  return (
    <div className="">
      <h1 className="font-title text-6xl flex justify-center">
        Last Tokens
      </h1>
      <div
        className={cn(
          "font-body flex flex-wrap items-stretch max-md:place-content-center py-10 justify-center",
          className
        )}
      >
        <Suspense
          fallback={Array.from({ length: 12 }, (_, idx) => {
            return <CoinCardSkeleton key={idx} />;
          })}
        >
          {/* server-component */}
          <AllCoinsGetDataWrapper />
        </Suspense>
      </div>
    </div>
  );
};
