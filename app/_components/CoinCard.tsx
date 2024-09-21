import Image from "next/image";
import type { TTokenData } from "@/types";
import Link from "next/link";

type TProps = {
  coin: TTokenData;
};

const CoinCard = ({ coin }: TProps) => {
  return (
    <div className="card min-w-64 lg:card-side bg-base-100 shadow-xl">
      <figure>
        <Image src={coin.imageUrl} alt={coin.name} width={175} height={175} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{coin.name}</h2>
        <p>{coin.description}</p>
        <div className="card-actions justify-end">
          <Link href={`/token/${coin.address}`} className="btn btn-primary">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;

export const CoinCardSkeleton = () => {
  return (
    <div className="flex w-72 flex-col gap-4">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};
