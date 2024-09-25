"use client";

import Image from "next/image";
import { mockInitialState, OrderSide } from "@/app/_store/tokenSlice";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";

type TProps = {
  tokenAddress: string;
};

interface OrderSideTabProps {
  orderSide: OrderSide;
}

function OrderSideTabs() {
  return (
    <div
      // OUTSIDE_CONTAINER_MAX_WIDTH
      className={`h-[40px] flex w-full`}
    >
      {[OrderSide.BUY, OrderSide.SELL].map((currentSide, indx) => (
        <OrderSideTab orderSide={currentSide} key={indx} />
      ))}
    </div>
  );
}

function OrderSideTab({ orderSide }: OrderSideTabProps): JSX.Element | null {
  const side = useAppSelector((state) => state.token.formInput.side);
  // const dispatch = useAppDispatch();

  return (
    <div
      className={`w-1/2 flex justify-center items-center cursor-pointer hover:opacity-100 ${
        side === "BUY" && orderSide === "BUY"
          ? "bg-dexter-green text-content-dark"
          : side === "SELL" && orderSide === "SELL"
          ? "bg-dexter-red text-white"
          : "opacity-50"
      }`}
      onClick={() => {
        // dispatch(orderInputSlice.actions.resetUserInput());
        // dispatch(orderInputSlice.actions.setSide(orderSide));
      }}
    >
      <p className="font-bold text-sm tracking-[.1px] select-none uppercase">
        {orderSide}
      </p>
    </div>
  );
}

const TokenDetails = ({ tokenAddress }: TProps) => {
  console.log("tokenAddress", tokenAddress);

  // useEffect fetch token data

  const token = mockInitialState;

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-center">
            <Image
              src={token.imageUrl}
              alt={`${token.name} token image`}
              width={400}
              height={150}
              className="object-cover rounded-xl h-64"
            />
          </div>
          <div className="p-4">
            <div className="font-[family-name:var(--font-londrina-solid)] text-4xl text-dexter-green-OG/90">
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
          <div className="flex justify-center items-center text-white">
            Trading Chart
          </div>
          <div className="">
            <OrderSideTabs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
