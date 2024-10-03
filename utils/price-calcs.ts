// this function calculates the amount of XRD you need to send to receive the specified amount of tokens
export function calcBuyTokensSpecified(
  newTokens: number,
  supply: number,
  multiplier: number
): number {
  const result = (multiplier / 3) * (((supply + newTokens) ^ 3) - (supply ^ 3));
  return result;
}

// this function calculates the amount of tokens you will receive for the specified amount of XRD
export function calcBuyXrdSpecified(
  newXrd: number,
  supply: number,
  multiplier: number
): number {
  const result = ((newXrd / multiplier) * 3 - (supply ^ 3)) ^ (1 / 3 - supply);
  return result;
}

// this function calculates the amount of XRD you will receive by selling the specified amount of tokens
export function calcSellTokensSpecified(
  tokensToSell: number,
  supply: number,
  multiplier: number
): number {
  const result =
    (multiplier / 3) * ((supply ^ 3) - ((supply - tokensToSell) ^ 3));
  return result;
}

// this function calculates the amount of tokens you need to sell to receive the specified amount of xrd
export function calcSellXrdSpecified(
  xrdToReceive: number,
  supply: number,
  multiplier: number
): number {
  const result =
    supply - (((supply ^ 3) - (xrdToReceive / multiplier) * 3) ^ (1 / 3));
  return result;
}
