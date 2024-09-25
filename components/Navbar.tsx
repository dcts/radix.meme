"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../public/racoon-head.png";
import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { useEffect, useRef } from "react";
import { userSlice } from "@/app/_store/userSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const radixConnectButtonRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleDisconnect = () => {
      dispatch(userSlice.actions.reset());
    };
    const radixConnectButton = radixConnectButtonRef.current;
    if (radixConnectButton) {
      radixConnectButton.addEventListener("onDisconnect", handleDisconnect);
    }
    return () => {
      if (radixConnectButton) {
        radixConnectButton.removeEventListener(
          "onDisconnect",
          handleDisconnect
        );
      }
    };
  }, [dispatch]);

  const { balances } = useAppSelector((state) => state.user);
  const xrdBalance = balances[process.env.NEXT_PUBLIC_XRD_ADDRESS || ""] || -1;
  return (
    <header className="w-full h-full flex items-center justify-between px-8">
      <Link href="/" className="flex justify-center items-center relative">
        <Image
          alt="racoon head"
          src={logo}
          width={50}
          height={50}
          className="hover:animate-spin transition duration-1000"
        />
        <span className="mx-3 font-[family-name:var(--font-londrina-solid)] text-xl font-black tracking-wider">
          RADIX.MEME
        </span>
        <BetaLabel />
      </Link>
      <div className="h-full flex items-center">
        <radix-connect-button
          ref={radixConnectButtonRef}
        ></radix-connect-button>
        {xrdBalance >= 0 && (
          <p className="absolute text-sm pt-1 opacity-70">
            Balance: {xrdBalance.toLocaleString()} XRD
          </p>
        )}
      </div>
    </header>
  );
};

export const BetaLabel = () => {
  return (
    <span className="bg-dexter-red text-sm font-bold px-2 py-[0.15rem] rounded-md hover:scale-[1.2] transition-transform duration-300 font-[family-name:var(--font-londrina-solid)]">
      BETA
    </span>
  );
};
export default Navbar;
