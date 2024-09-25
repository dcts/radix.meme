"use client";

import { useEffect } from "react";
import { getGatewayApiClientOrThrow } from "../_store/subscriptions";
import { wait } from "@/utils";

const Token = () => {
  useEffect(() => {
    const fetchToken = async () => {
      await wait(1000);
      const gatewayApiClient = getGatewayApiClientOrThrow();
      const res = await gatewayApiClient.state.getAllEntityMetadata(
        "resource_tdx_2_1tkz9x0qatyn8d96lp74je0zs557faqlnsa0q25yrr3qgf2ff092yl6"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      );
      const dict = {};
      res.forEach(({key, value}) => {
        dict[key] = value.typed.value;
      })
      console.log(dict);
    }
    fetchToken();
  }, []);
  return (
    <div className="font-[family-name:var(--font-londrina-solid)]">
      <h1 className="mb-8 text-center max-w-sm text-4xl font-black">
        FETCH TOKEN
      </h1>
    </div>
  );
};

export default Token;
