import { NextResponse } from "next/server";
import { TTokenData } from "@/types";
import { getTokenData } from "@/utils/api-calls";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, context: any) {
  const { componentAddress } = context.params;

  console.log("FROM THE SERVER");
  console.log(componentAddress);

  const token: TTokenData = await getTokenData(componentAddress);
  
  return NextResponse.json({
    lastPrice: token.lastPrice,
    supply: token.supply,
    maxSupply: token.maxSupply,
    progress: token.progress
  });
}
