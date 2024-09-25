/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from "axios";

export class ApiResult {
  constructor(
    public status: number = 0,
    public message: string = "",
    public data: any = {}
  ) {}
}

const mainnet = axios.create({ baseURL: "https://mainnet.radixdlt.com" });
const stokenet = axios.create({
  baseURL: "https://babylon-stokenet-gateway.radixdlt.com",
});
// const RCNet = axios.create({ baseURL: "https://rcnet.radixdlt.com" });

// const RCNetAPIOptions = [RCNet];

// let APIOptions = [...RCNetAPIOptions];
// let APIOptions = [radixMainnet];
let APIOptions = [stokenet];
let APIIndex = 0;
const MAX_RETRIES = 1;

export function setNetwork(network: string) {
  switch (network) {
    case "mainnet": {
      APIOptions = [mainnet];
      console.log("Radix network set to 'mainnet'");
      break;
    }
    case "stokenet": {
      APIOptions = [stokenet];
      console.log("Radix network set to 'stokenet'");
      break;
    }
    default: {
      console.warn("Invalid Radix network specified: " + network);
    }
  }
}

export async function getTransactionStatus(
  tx_intent_hash: string
): Promise<ApiResult> {
  return getRadixApiValue("transaction/status", {
    intent_hash_hex: tx_intent_hash,
  });
}

export async function getTransactionDetail(
  tx_intent_hash: string
): Promise<ApiResult> {
  return getRadixApiValue("transaction/committed-details", {
    intent_hash: tx_intent_hash,
    opt_ins: {
      raw_hex: "false",
      receipt_state_changes: "true",
      receipt_fee_summary: "true",
      receipt_events: "true",
      affected_global_entities: "true",
    },
  });
}

export async function getRadixApiValue(
  url: string,
  params: any = {},
  retry = 0
): Promise<ApiResult> {
  // console.debug("Making radix api call. API Index: "+this.apiIndex+" Retry: "+retry);
  const apiServer = APIOptions[APIIndex];
  let apiRes;
  try {
    apiRes = await apiServer.request({
      method: "post",
      url: "/" + url,
      data: params,
    });
  } catch (error) {
    const errorResult = getAxiosError(error);
    if (retry < MAX_RETRIES) {
      incApiIndex();
      return getRadixApiValue(url, params, retry + 1);
    } else {
      return errorResult;
    }
  }
  return new ApiResult(apiRes.status, apiRes.statusText, apiRes.data);
}

function getAxiosError(error: any): ApiResult {
  const errorResult = new ApiResult();
  if (error.response) {
    errorResult.status = error.response.status;
    errorResult.message =
      "Radix API error. " + error.response.data.message
        ? error.response.data.message
        : "";
    errorResult.data = error.response.data ? error.response.data : {};
  } else if (error.request) {
    errorResult.message =
      "No response received from the server. " + error.message;
  } else if (error.message) {
    errorResult.message = "API request error. " + error.message;
  } else {
    errorResult.message = "Unknown error encountered.";
    console.error("Unknown axios error encountered. ", error);
  }
  return errorResult;
}

function incApiIndex() {
  if (APIIndex === APIOptions.length - 1) {
    APIIndex = 0;
  } else {
    APIIndex++;
  }
}
