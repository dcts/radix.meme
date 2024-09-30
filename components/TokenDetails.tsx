"use client";

import Image from "next/image";
import { OrderSide, tokenSlice } from "@/app/_store/tokenSlice";
import {
  useAppDispatch,
  useAppSelector,
  usePrevious,
} from "@/app/_hooks/hooks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { buyTxManifest, sellTxManifest } from "@/utils/tx-utils";
import tradingChart from "../public/trading-chart.svg";
import { TTokenData } from "@/types";
import {
  displayNumber,
  MEMECOIN_AMOUNT_PRECISION,
  shortenString,
  truncateWithPrecision,
  XRD_AMOUNT_PRECISION,
  XRD_FEE_ALLOWANCE,
} from "@/utils";
import { Skeleton } from "./ui/skeleton";
import { getRdtOrThrow } from "@/app/_store/subscriptions";

interface OrderSideTabProps {
  orderSide: OrderSide;
  resetInput: () => void;
}
interface OrderSideTabsProps {
  resetInput: () => void;
}

function OrderSideTabs({ resetInput }: OrderSideTabsProps) {
  return (
    <div
      // OUTSIDE_CONTAINER_MAX_WIDTH
      className={`h-[40px] flex w-full`}
    >
      {[OrderSide.BUY, OrderSide.SELL].map((currentSide, indx) => (
        <OrderSideTab
          orderSide={currentSide}
          key={indx}
          resetInput={resetInput}
        />
      ))}
    </div>
  );
}

function OrderSideTab({
  orderSide,
  resetInput,
}: OrderSideTabProps): JSX.Element | null {
  const side = useAppSelector((state) => state.token.formInput.side);
  const dispatch = useAppDispatch();

  return (
    <div
      className={`w-1/2 flex justify-center items-center cursor-pointer hover:opacity-100 border rounded-tl-sm rounded-tr-sm ${
        side === "BUY" && orderSide === "BUY"
          ? "bg-dexter-gray-dark text-dexter-green bg-dexter-gray-c"
          : side === "SELL" && orderSide === "SELL"
          ? "text-dexter-red-c bg-dexter-gray-dark bg-dexter-gray-c"
          : "opacity-50"
      }`}
      onClick={() => {
        dispatch(tokenSlice.actions.setOrderSide(orderSide));
        resetInput();
      }}
    >
      <p className="font-bold text-sm tracking-[.1px] select-none uppercase">
        {orderSide}
      </p>
    </div>
  );
}

const TokenDetails = ({ tokenData }: { tokenData: TTokenData }) => {
  const componentAddress = tokenData.componentAddress;
  const tokenAddress = tokenData.address;
  // const resourceAddress = tokenData.address;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(tokenSlice.actions.setTTokenData(tokenData));
  }, [dispatch, tokenData]);
  // const {
  //   address,
  //   componentAddress,
  //   description,
  //   name,
  //   symbol,
  //   iconUrl,
  //   maxSupply,
  //   supply,
  //   progress,
  // } = tokenData;
  // const token = {
  //   name,
  //   symbol,
  //   description,
  //   iconUrl,
  //   address,
  // };

  const { token, maxSupply, supply, progress } = useAppSelector(
    (state) => state.token
  );
  const { lastPrice } = useAppSelector((state) => state.token);
  const previousPrice = usePrevious(lastPrice);

  useEffect(() => {
    if (
      previousPrice === undefined ||
      lastPrice === undefined ||
      previousPrice === lastPrice ||
      previousPrice < 0 // empty
    ) {
      return;
    }
    if (lastPrice > previousPrice) {
      console.log("flashing green!");
      console.log({ lastPrice, previousPrice });
      setFlashState("flash-green");
    } else if (lastPrice < previousPrice) {
      setFlashState("flash-red");
    } else {
      setFlashState("flash-none");
    }
    setTimeout(() => {
      setFlashState("flash-none");
    }, 1000);
  }, [lastPrice, previousPrice]);

  const { side, sellAmount, buyAmount } = useAppSelector(
    (state) => state.token.formInput
  );
  const userAddress = useAppSelector(
    (state) => state.user.selectedAccount.address
  );
  const xrdBalance = useAppSelector(
    (state) =>
      state.user.balances[process.env.NEXT_PUBLIC_XRD_ADDRESS || 0] || 0
  );
  const tokenBalance = useAppSelector(
    (state) => state.user.balances[token.symbol || ""] || 0
  );

  const [inputAmount, setInputAmount] = useState<string>("");
  const [flashState, setFlashState] = useState<string>("flash-none");

  const handleBuy = async () => {
    console.log("Handle Buy");
    const rdt = getRdtOrThrow();
    const transactionResult = await rdt.walletApi.sendTransaction({
      transactionManifest: buyTxManifest(
        buyAmount?.toString() || "0",
        process.env.NEXT_PUBLIC_XRD_ADDRESS || "",
        componentAddress || "",
        userAddress
      ),
    });
    console.log("finished transaction");
    if (!transactionResult.isOk()) {
      throw new Error("Transaction failed");
    }
    await updateTradeData();
  };

  const handleSell = async () => {
    const rdt = getRdtOrThrow();
    const transactionResult = await rdt.walletApi.sendTransaction({
      transactionManifest: sellTxManifest(
        sellAmount?.toString() || "0",
        tokenData.address,
        tokenData.componentAddress || "",
        userAddress
      ),
    });
    if (!transactionResult.isOk()) {
      throw new Error("Transaction failed");
    }
    await updateTradeData();
  };

  const handleAmountInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    // Regular expression to match the specified structure
    const validPattern = /^[0-9]*[.,]?[0-9]*$/;
    if (validPattern.test(value)) {
      setInputAmount(value); // Set value if it matches the pattern
      dispatch(
        side === "BUY"
          ? tokenSlice.actions.setBuyAmount(Number(value))
          : tokenSlice.actions.setSellAmount(Number(value))
      );
    } else {
      alert(
        "Invalid format! Please use the format: number, followed by a dot or comma, followed by more numbers."
      );
      setInputAmount(value.slice(0, -1));
    }
  };

  const hasLastPrice = !!lastPrice;
  const resetInput = () => setInputAmount("");

  const updateTradeData = async () => {
    console.log("inside updateTradeData()");
    const response = await fetch(`/api/token/${componentAddress}`, {
      headers: {
        Accept: "application/json",
        method: "GET",
      },
    });
    console.log({ response });
    if (response) {
      const tTokenData = await response.json();
      dispatch(tokenSlice.actions.updateTradeData(tTokenData));
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="grid md:grid-cols-2 gap-2 lg:!grid-cols-[60%_40%]">
          <div className="flex justify-center">
            <Image
              src={token.iconUrl || ""}
              alt={`${token.name} token image`}
              width={400}
              height={150}
              className="object-cover rounded-xl h-64 w-full"
            />
          </div>
          <div className="p-4">
            <div className="font-[family-name:var(--font-londrina-solid)] text-4xl text-dexter-green-OG/90">
              {token.name}
            </div>
            {/* <button
              className="bg-white text-black px-4 py-1 rounded-full"
              onClick={testingApi}
            >
              TEST
            </button> */}
            <div className="font-[family-name:var(--font-josefin-sans)]">
              <div className="text-xs pt-2 pb-4 font-semibold">
                Created by: {shortenString(tokenAddress || "", 7, 4)}
              </div>
              <div className="text-white text-opacity-40">
                {token.description || ""}
              </div>
            </div>
          </div>
          <div className="flex justify-center text-white">
            <Image
              src={tradingChart}
              alt="trading-chart"
              width={500}
              height={500}
              className="rounded-xl h-[500px] w-[500px]"
            />
          </div>
          <div className="font-[family-name:var(--font-josefin-sans)]">
            <div className="">
              <OrderSideTabs resetInput={resetInput} />
            </div>
            <div className="border border-white-1 p-6 rounded-bl-sm rounded-br-sm bg-dexter-gray-c">
              <div className="flex flex-row justify-between mt-3 text-base px-1">
                <p className="w-full">Last Price:</p>
                <p
                  className={`${
                    hasLastPrice ? "" : "opacity-50"
                  } w-full text-right`}
                >
                  <span className={`${flashState} px-1 py-1`}>
                    {hasLastPrice
                      ? lastPrice === -1
                        ? ""
                        : `${lastPrice.toFixed(6)} XRD`
                      : "no trades"}
                  </span>
                </p>
              </div>
              <div className="w-full flex content-between px-1 mt-4">
                <p className="">Amount</p>
                <SecondaryLabel
                  label="Available"
                  currency={side === "BUY" ? "XRD" : token.symbol || ""}
                  precision={
                    side === "BUY"
                      ? XRD_AMOUNT_PRECISION
                      : MEMECOIN_AMOUNT_PRECISION
                  }
                  value={side === "BUY" ? xrdBalance : tokenBalance}
                  onClickHandler={(value) => {
                    if (value === 0) {
                      setInputAmount("");
                      return;
                    }
                    setInputAmount((value - XRD_FEE_ALLOWANCE).toString());
                  }}
                />
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  className="text-base grow w-full pl-2 bg-dexter-grey-dark rounded-lg h-10 text-right pr-5 border border-solid border-[#4a4a4a] focus:outline-none"
                  placeholder="0.00"
                  onChange={handleAmountInput}
                  value={inputAmount}
                />
              </div>
              {side === "SELL" && ( // Check if the current order side is SELL
                <Link
                  href=""
                  className="flex justify-center w-full mx-auto gap-2 bg-dexter-red-b hover:bg-dexter-red-c rounded-lg text-white px-4 py-3 max-lg:self-center shadow-md shadow-dexter-red-b transition duration-300 mt-4 mb-4"
                  onClick={handleSell}
                >
                  <span className="font-bold text-sm">
                    Sell ${token.symbol}
                  </span>
                </Link>
              )}
              {side === "BUY" && (
                <Link
                  href=""
                  className="flex justify-center w-full mx-auto gap-2 bg-dexter-green-OG/90 hover:bg-dexter-gradient-green rounded-lg text-dexter-grey-light px-4 py-3 max-lg:self-center shadow-md shadow-dexter-green-OG transition duration-300 mt-4 mb-4"
                  onClick={async () => await handleBuy()}
                >
                  <span className="font-bold text-sm">Buy ${token.symbol}</span>
                </Link>
              )}
            </div>
            <div>
              <div className="flex flex-row justify-between mt-8">
                <p>Supply:</p>
                <p>{supply}</p>
              </div>
              <div className="flex flex-row justify-between mt-1">
                <p>Available:</p>
                <p>{maxSupply}</p>
              </div>
              <div className="flex flex-row justify-between mt-1">
                <p>Bonding curve progress:</p>
                <p>{progress}</p>
              </div>
              <p className="text-white text-opacity-40 pt-4 leading-none">
                When the total inflows reach 333,000 XRD all the liquidity from
                the bonding curve will be deposited into an AMM dex and the
                bonding curve disabled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;

export const TokenDetailsSkeleton = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4 lg:!grid-cols-[60%_40%]">
          <div className="flex justify-center">
            <Skeleton className="w-full h-64 rounded-xl bg-dexter-green/55" />
          </div>

          <div className="p-4">
            <div className="font-[family-name:var(--font-londrina-solid)] text-4xl text-dexter-green-OG/90">
              <Skeleton className="w-full h-full rounded-xl" />
            </div>
            <div className="font-[family-name:var(--font-josefin-sans)]">
              {/* coin name */}
              <Skeleton className="w-28 h-10 mb-2 rounded-xl bg-dexter-green/55" />

              <div className="text-xs pt-2 pb-4 font-semibold flex items-center gap-x-2 w-full">
                <span className="whitespace-nowrap">Created by:</span>
                <Skeleton className="w-full h-4 rounded-xl" />
              </div>
              <Skeleton className="ms-2 w-full h-32 rounded-xl bg-stone-400/55" />
            </div>
          </div>

          {/* chart */}
          <Skeleton className="w-full h-[96%] rounded-xl" />

          <div className="font-[family-name:var(--font-josefin-sans)]">
            <div className="flex">
              {/* OrderSideTabs */}
              <div
                className={`w-1/2 flex justify-center items-center cursor-pointer hover:opacity-100 border rounded-tl-sm rounded-tr-sm
                  bg-dexter-gray-dark text-dexter-green bg-dexter-gray-c
                }`}
              >
                <p className="font-bold h-fit py-2 text-sm tracking-[.1px] select-none uppercase">
                  buy
                </p>
              </div>
              <div
                className={`w-1/2 flex justify-center items-center cursor-pointer hover:opacity-100 border rounded-tl-sm rounded-tr-sm
                  opacity-50
                }`}
              >
                <p className="font-bold h-fit py-2 text-sm tracking-[.1px] select-none uppercase">
                  sell
                </p>
              </div>
            </div>
            <div className="border border-white-1 p-6 rounded-bl-sm rounded-br-sm bg-dexter-gray-c">
              <div className="flex justify-between mt-3 items-center">
                <span className="whitespace-nowrap">Last Price:</span>
                <Skeleton className="w-8 h-2 rounded-xl bg-slate-50" />
              </div>
              <p className="mt-4">Amount</p>
              <div className="mt-2">
                {/* input */}
                <Skeleton className="grow w-full pl-2 bg-dexter-grey-dark rounded-lg h-12 flex flex-col justify-center">
                  <Skeleton className="w-8 h-2 rounded-xl bg-slate-50" />
                </Skeleton>
              </div>

              <div className="flex justify-center w-full mx-auto gap-2 bg-dexter-green-OG/90 hover:bg-dexter-gradient-green rounded-lg text-dexter-grey-light px-4 py-3 max-lg:self-center shadow-md shadow-dexter-green-OG transition duration-300 mt-4 mb-4">
                <span className="font-bold text-sm">
                  Buy <Skeleton className="w-full h-2 rounded-lg" />
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mt-8  items-center">
                <span>Supply:</span>
                <Skeleton className="w-8 h-2 rounded-xl bg-slate-50" />
              </div>
              <div className="flex justify-between mt-1 items-center">
                <span>Available:</span>
                <Skeleton className="w-12 h-2 rounded-xl bg-slate-50" />
              </div>
              <div className="flex justify-between mt-1 items-center">
                <p className="whitespace-nowrap">Ready to DeXter:</p>
                <Skeleton className="w-16 h-2 rounded-xl bg-slate-50" />
              </div>
              <p className="text-white text-opacity-40 pt-4 leading-none">
                When the total inflows reach 333,000 XRD all the liquidity from
                the bonding curve will be deposited into an AMM dex and the
                bonding curve disabled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SecondaryLabelProps {
  disabled?: boolean;
  label: string;
  currency: string;
  precision: number;
  value: number;
  onClickHandler: (value: number) => void;
}

// Secondary label (displayed on the right) of an input field
// can be used for showing "available" balances above the input field
function SecondaryLabel({
  disabled,
  label,
  currency,
  precision,
  value,
  onClickHandler,
}: SecondaryLabelProps): JSX.Element | null {
  return disabled ? (
    <></>
  ) : (
    <p
      className="text-xs w-full font-medium text-white underline cursor-pointer tracking-[0.1px] text-right opacity-50 mt-2"
      onClick={() => onClickHandler(value)}
    >
      {label}:{" "}
      {value === 0 ? 0 : displayNumber(truncateWithPrecision(value, precision))}{" "}
      {currency}
    </p>
  );
}
