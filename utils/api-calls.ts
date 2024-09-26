/* eslint-disable  @typescript-eslint/no-explicit-any */
import { TMainComponentData, TTokenData } from "@/types";
import { getRadixApiValue } from "./radix-api";

export async function getMainComponentState(
  componentAddress: string
): Promise<TMainComponentData> {
  const result = {
    address: "",
    ownerBadge: "",
    maxTokenSupply: 0,
    maxXrd: 0,
    multiplier: "",
    tokensKvs: "",
  };
  const apiResult = await getRadixApiValue("state/entity/details", {
    addresses: [componentAddress],
    aggregation_level: "Global",
  });
  if (apiResult.status != 200) {
    console.error(
      "Problem fetching main component details for address: " +
        componentAddress,
      apiResult
    );
    throw new Error();
  } else {
    if (apiResult.data?.items?.length > 0) {
      const stateFields = apiResult.data.items[0].details?.state?.fields;
      stateFields.forEach((fieldData: any) => {
        switch (fieldData.field_name) {
          case "address": {
            result.address = fieldData.value;
            break;
          }
          case "owner_badge_manager": {
            result.ownerBadge = fieldData.value;
            break;
          }
          case "max_token_supply": {
            result.maxTokenSupply = Number(fieldData.value);
            break;
          }
          case "max_xrd": {
            result.maxXrd = Number(fieldData.value);
            break;
          }
          case "multiplier": {
            result.maxXrd = fieldData.value;
            break;
          }
          case "tokens": {
            result.tokensKvs = fieldData.value;
            break;
          }
        }
      });
    }
  }
  return result;
}
export async function getAllTokensData(
  kvsAddress: string
): Promise<TTokenData[]> {
  const result: TTokenData[] = [];
  const tokenComponents = await getAllTokensComponents(kvsAddress);
  for (const tokenComponent of tokenComponents) {
    const tokenData = await getTokenData(tokenComponent);
    if (tokenData.address) {
      result.push(tokenData);
    }
  }
  return result;
}

export async function getAllTokensComponents(
  kvsAddress: string
): Promise<string[]> {
  let result: string[] = [];
  const apiResult = await getRadixApiValue("state/key-value-store/keys", {
    key_value_store_address: kvsAddress,
  });
  if (apiResult.status != 200) {
    console.error(
      "Problem fetching all tokens components form radix api.",
      apiResult
    );
  } else {
    if (apiResult.data?.items) {
      result = apiResult.data.items.map(
        (kvsItemData: any) => kvsItemData.key?.programmatic_json?.value
      );
    }
  }
  return result;
}

export async function getTokenData(
  tokenComponent: string
): Promise<TTokenData> {
  const result: TTokenData = {
    address: "",
    componentAddress: tokenComponent,
    progress: 0,
    name: "",
    symbol: "",
    imageUrl: "",
    description: "",
    telegramUrl: "",
    xUrl: "",
    website: "",
    supply: 0,
    maxSupply: 0,
  };
  const apiResult = await getRadixApiValue("state/entity/details", {
    addresses: [tokenComponent],
    aggregation_level: "Global",
  });
  if (apiResult.status != 200) {
    console.error(
      "Problem fetching component details for token component: " +
        tokenComponent,
      apiResult
    );
    throw new Error();
  } else {
    if (apiResult.data.items.length > 0) {
      const componentStateFields =
        apiResult.data.items[0].details?.state?.fields;
      for (const fieldData of componentStateFields) {
        switch (fieldData.name) {
          case "token_manager": {
            result.address = fieldData.value;
            break;
          }
          case "current_supply": {
            result.supply = Number(fieldData.value);
            break;
          }
          case "max_supply": {
            result.maxSupply = Number(fieldData.value);
            break;
          }
          case "last_price": {
            result.lastPrice = Number(fieldData.value);
            break;
          }
        }
      }
      if (result.supply && result.maxSupply) {
        result.progress = result.supply / result.maxSupply;
      }
      if (result.address) {
        const apiResult2 = await getRadixApiValue(
          "state/entity/page/metadata",
          {
            address: result.address,
          }
        );
        if (apiResult2.status != 200) {
          console.error(
            "Problem fetching metadata for token: " + result.address,
            apiResult2
          );
          throw new Error();
        } else {
          if (apiResult2.data.items) {
            for (const data of apiResult2.data.items) {
              switch (data.key) {
                case "name": {
                  result.name = data.value.typed.value;
                  break;
                }
                case "symbol": {
                  result.symbol = data.value.typed.value;
                  break;
                }
                case "description": {
                  result.description = data.value.typed.value;
                  break;
                }
                case "icon_url": {
                  result.iconUrl = data.value.typed.value;
                  break;
                }
                case "image_url": {
                  result.imageUrl = data.value.typed.value;
                  break;
                }
                case "telegram": {
                  result.telegramUrl = data.value.typed.value;
                  break;
                }
                case "x": {
                  result.xUrl = data.value.typed.value;
                  break;
                }
                case "website": {
                  result.website = data.value.typed.value;
                  break;
                }
              }
            }
          }
        }
      }
    }
  }
  return result;
}
