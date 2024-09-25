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
    <div className="w-full flex items-center justify-between h-16 px-8 sm:px-20">
      <Link href="/" className="flex justify-center items-center relative">
        <Image
          alt="racoon head"
          src={logo}
          width={50}
          height={50}
          className="hover:animate-spin transition duration-1000"
        />
        <h1 className="ml-3 text-lg text-white font-bold font-[family-name:var(--font-geist-mono)]">
          radix.meme
        </h1>
        <BetaLabel />
      </Link>
      <div>
        <radix-connect-button
          ref={radixConnectButtonRef}
        ></radix-connect-button>
        {xrdBalance >= 0 && (
          <p className="absolute text-sm pt-1 opacity-70">
            Balance: {xrdBalance.toLocaleString()} XRD
          </p>
        )}
      </div>
    </div>
  );
};

const BetaLabel = () => {
  return (
    <div className="bg-dexter-red text-xs font-bold px-2 py-1 rounded-md absolute rotate-[15deg] right-[-37px] top-[-5px] hover:scale-[1.2] transition-transform duration-300 select-none">
      BETA
    </div>
  );
};
export default Navbar;
