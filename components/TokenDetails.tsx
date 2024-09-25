"use client";

import { useAppDispatch, useAppSelector } from "@/app/_hooks/hooks";
import { fetchToken } from "@/app/_store/tokenSlice";
import { useEffect } from "react";

type TProps = {
  tokenAddress: string;
};

const TokenDetails = ({ tokenAddress }: TProps) => {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector(state => state.token);
  
  // useEffect fetch token data
  useEffect(() => {
    async function loadTokenData() {
      await dispatch(fetchToken(tokenAddress));
    }
    loadTokenData();
  }, [dispatch, tokenAddress]);

  return (
    <div>
      <div>{token.name}</div>
      <div>{token.symbol}</div>
      <div>{token.iconUrl}</div>
      <div>{token.description}</div>
      <div>{token.telegram}</div>
      <div>{token.x}</div>
      <div>{token.website}</div>
    </div>
  );
};

export default TokenDetails;
