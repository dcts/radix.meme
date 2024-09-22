import Image from "next/image";
import type { TTokenData } from "@/types";
import Link from "next/link";

type TProps = {
  coin: TTokenData;
};

const CoinCard = ({ coin }: TProps) => {
  return (
    <Link
      href={`/token/${coin.address}`}
      className="card max-w-[28rem] card-compact bg-base-300 shadow-xl"
    >
      <figure>
        <Image
          src={coin.imageUrl}
          alt={coin.name}
          width={175}
          height={175}
          className="object-cover py-2"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-3xl">
          <span className="text-dexter-green capitalize">{coin.name} coin</span>
          <span className="text-dexter-gray uppercase">(${coin.symbol})</span>
        </h2>

        <p className="text-white/90 text-xl">
          Created by: account...{coin.address.slice(0, 12)}
        </p>

        <p className="line-clamp-3 text-white/40">{coin.description}</p>

        <div className="flex justify-between items-center my-2">
          <h2 className="text-2xl">Last Price:</h2>
          <div>
            <span className="text-dexter-green">+65%</span>
            <span className="ms-4 p-1 text-2xl bg-dexter-gray-b">
              0.002 XRD
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center my-2">
          <h2 className="text-2xl">Ready to DeXter:</h2>
          <div>
            <span className="text-dexter-green">20k / 100k XRD </span>
            <span className="ms-4">(20%)</span>
          </div>
        </div>

        <progress
          className="progress progress-primary w-full h-4 mb-4"
          value={20}
          max="100"
        ></progress>
      </div>
    </Link>
  );
};

export default CoinCard;

export const CoinCardSkeleton = () => {
  return (
    <div className="flex max-w-[28rem] flex-col gap-4">
      <div className="skeleton h-64 w-full"></div>
      <div className="flex flex-col py-2 gap-4">
        <div className="flex h-8 items-center gap-4">
          <span className="skeleton h-6 w-28 bg-dexter-green"></span>
          <span className="skeleton h-6 w-28"></span>
        </div>
        <div className="skeleton h-8 w-44"></div>
        <div className="skeleton h-12 w-full"></div>

        <div className="flex h-8 items-center justify-between">
          <span className="skeleton h-6 w-28"></span>
          <div className="flex h-8 items-center justify-between gap-4">
            <span className="skeleton h-6 w-16"></span>
            <span className="skeleton h-6 w-16"></span>
          </div>
        </div>

        <div className="flex h-8 items-center justify-between">
          <span className="skeleton h-6 w-28"></span>
          <div className="flex h-8 items-center justify-between gap-4">
            <span className="skeleton h-6 w-16"></span>
            <span className="skeleton h-6 w-16"></span>
          </div>
        </div>

        <progress className="progress h-4 progress-primary w-full"></progress>
      </div>
    </div>
  );
};

export const CoinCard2 = ({ coin }: TProps) => {
  const randomPercentage = Math.floor(Math.random() * 101);

  return (
    <Link
      href={`/token/${coin.address}`}
      className="card card-compact bg-base-300 shadow-xl max-w-[285px] h-[470px]"
    >
      <figure>
        <Image
          src={coin.imageUrl}
          alt={coin.name}
          width={175}
          height={240}
          className="object-cover w-full h-[240px]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <span className="text-dexter-green capitalize truncate">{coin.name}</span>
          <span className="text-dexter-gray uppercase truncate">(${coin.symbol})</span>
        </h2>

        <p className="text-white/90">
          Created by: account...{coin.address.slice(0, 12)}
        </p>

        <p className="line-clamp-3 text-white/40">{coin.description}</p>

        <div className="flex justify-between items-center my-2">
          <h2 className="">Last Price:</h2>
          <div>
            <span className="text-dexter-green">+65%</span>
            <span className="ms-4 p-1 bg-dexter-gray-b">0.002 XRD</span>
          </div>
        </div>

        <div className="flex justify-between items-center my-2">
          <h2 className="text-xs">Ready to DeXter:</h2>
          <div>
            <span className="text-dexter-green">
              {randomPercentage}k / 100k XRD{" "}
            </span>
            <span className="ms-4">({randomPercentage}%)</span>
          </div>
        </div>

        <progress
          className="progress progress-primary w-full h-3 mb-3"
          value={randomPercentage}
          max="100"
        ></progress>
      </div>
    </Link>
  );
};
