"use client";

import Image from "next/image";
import { mockInitialState } from "@/app/_store/tokenSlice";

type TProps = {
  tokenAddress: string;
};

const TokenDetails = ({ tokenAddress }: TProps) => {
  console.log("tokenAddress", tokenAddress);

  // useEffect fetch token data

  const token = mockInitialState;

  return (
    <div>
      <div className="max-w-2xl bg-grey">
        <div className="flex flex-row p-4 bg-red gap-2">
          <Image
            src={token.imageUrl}
            alt={`${token.name} token image`}
            width={200}
            height={200}
            className="mx-1 flex flex-grow-1"
          />
          <div className="mx-4 p-2">
            <div className="font-[family-name:var(--font-londrina-solid)] text-4xl  text-dexter-green-OG/90">
              {token.name}
            </div>
            <div className="font-[family-name:var(--font-josefin-sans)]">
              <div className="text-xs pt-2 pb-4 font-semibold">
                Created by: {token.address}
              </div>
              <div className="text-white text-opacity-40">
                {token.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
