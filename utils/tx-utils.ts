import { TokenInfo } from "@/app/_store/tokenStoreSlice";

function validateNotEmpty(input: string, variableName?: string) {
  if (!input) {
    throw new Error(`Invalid input ${variableName || ""}`);
  }
}

export function launchTokenTxManifest(
  token: TokenInfo,
  memetokensComponentAddress: string,
  txAccountAddress: string // token creator account
): string {
  // Validate inputs
  validateNotEmpty(memetokensComponentAddress, "memetokensComponentAddress");
  validateNotEmpty(txAccountAddress, "txAccountAddress");
  const {
    name,
    symbol,
    description,
    iconUrl,
    telegram,
    x,
    website,
  } = token;
  const manifest = `
    CALL_METHOD Address("${memetokensComponentAddress}") "new_token_curve_simple" "${name}" "${symbol}" "${description}" "${iconUrl}" "${telegram}" "${x}" "${website}";
    CALL_METHOD Address("${txAccountAddress}") "try_deposit_batch_or_abort" Expression("ENTIRE_WORKTOP") None;
  `;
  console.debug("launch token tx manifest:", manifest);
  return manifest;
}

export function buyTxManifest(
  xrdAmount: string,
  xrdAddress: string,
  tokenComponentAddress: string,
  txAccountAddress: string
): string {
  // Validate inputs
  validateNotEmpty(xrdAmount, "xrdAmount");
  validateNotEmpty(xrdAddress, "xrdAddress");
  validateNotEmpty(tokenComponentAddress, "tokenComponentAddress");
  validateNotEmpty(txAccountAddress, "txAccountAddress");
  const manifest = `
    CALL_METHOD Address("${txAccountAddress}") "withdraw" Address("${xrdAddress}") Decimal("${xrdAmount}");
    TAKE_ALL_FROM_WORKTOP Address("${xrdAddress}") Bucket("tx_bucket");
    CALL_METHOD Address("${tokenComponentAddress}") "buy" Bucket("tx_bucket");
    CALL_METHOD Address("${txAccountAddress}") "try_deposit_batch_or_abort" Expression("ENTIRE_WORKTOP") None;
  `;
  console.debug("buy tx manifest:", manifest);
  return manifest;
}

export function sellTxManifest(
  tokenAmount: string,
  tokenResourceAddress: string,
  tokenComponentAddress: string,
  txAccountAddress: string
): string {
  // Validate inputs
  validateNotEmpty(tokenAmount, "tokenAmount");
  validateNotEmpty(tokenResourceAddress, "tokenResourceAddress");
  validateNotEmpty(tokenComponentAddress, "tokenComponentAddress");
  validateNotEmpty(txAccountAddress, "txAccountAddress");
  const manifest = `
    CALL_METHOD Address("${txAccountAddress}") "withdraw" Address("${tokenResourceAddress}") Decimal("${tokenAmount}");
    TAKE_ALL_FROM_WORKTOP Address("${tokenResourceAddress}") Bucket("tx_bucket");
    CALL_METHOD Address("${tokenComponentAddress}") "sell" Bucket("tx_bucket");
    CALL_METHOD Address("${txAccountAddress}") "try_deposit_batch_or_abort" Expression("ENTIRE_WORKTOP") None;
  `;
  console.debug("sell tx manifest:", manifest);
  return manifest;
}
