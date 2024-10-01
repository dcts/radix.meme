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
  const tokenComponents = await getAllTokensComponents(kvsAddress);
  const result: TTokenData[] = await Promise.all(
    tokenComponents?.map((tokenComponent) => {
      return getTokenData(tokenComponent);
    })
  );
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
  // First API call to get component's metadata
  const getComponentApiResult = await getRadixApiValue("state/entity/details", {
    addresses: [tokenComponent],
    aggregation_level: "Global",
  });
  // Validate and throw if request was not successfull
  if (getComponentApiResult.status != 200) {
    throw new Error(
      `Problem fetching component details for token component: ${tokenComponent}. API Result: ${JSON.stringify(
        getComponentApiResult
      )}`
    );
  }
  if (getComponentApiResult.data.items.length === 0) {
    return result;
  }
  // Extract metadata from component
  const componentStateFields =
    getComponentApiResult.data.items[0].details?.state?.fields;
  for (const fieldData of componentStateFields) {
    if (!fieldData.field_name) {
      console.error("fieldData.field_name does not exist for fieldData:");
      console.error(fieldData);
      continue;  // skip to next field
    }
    switch (fieldData.field_name) {
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
  // If no resource address found, do not continue
  if (!result.address) {
    return result;
  }
  // Second API call to get metadata of the resource
  const getResourceApiResult = await getRadixApiValue(
    "state/entity/page/metadata",
    {
      address: result.address,
    }
  );
  // Validate
  if (getResourceApiResult.status != 200) {
    console.error(
      `Problem fetching metadata for token: ${
        result.address
      }. API Result: ${JSON.stringify(getResourceApiResult)}`
    );
    return result;
  }
  // If no items exist, do not continue
  if (!getResourceApiResult.data.items) {
    return result;
  }
  // Extract metadata from resource
  for (const data of getResourceApiResult.data.items) {
    if (!data.key) {
      console.error("data.key does not exist for data:");
      console.error(data);
      continue;  // skip to next data field
    }
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
  return result;
}
