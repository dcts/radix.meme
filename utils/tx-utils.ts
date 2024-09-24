export function launchTokenTxManifest(
  name: string,
  symbol: string,
  description: string,
  icon_url: string,
  telegram: string,
  x: string,
  website: string,
  memetokensComponentAddress: string,
  txAccountAddress: string
): string {
  let manifest = `
    CALL_METHOD Address("${memetokensComponentAddress}") "new_token_curve_simple" "${name}" "${symbol}" "${description}" "${icon_url}" "${telegram}" "${x}" "${website}";
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
  let manifest = `
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
  let manifest = `
    CALL_METHOD Address("${txAccountAddress}") "withdraw" Address("${tokenResourceAddress}") Decimal("${tokenAmount}");
    TAKE_ALL_FROM_WORKTOP Address("${tokenResourceAddress}") Bucket("tx_bucket");
    CALL_METHOD Address("${tokenComponentAddress}") "sell" Bucket("tx_bucket");
    CALL_METHOD Address("${txAccountAddress}") "try_deposit_batch_or_abort" Expression("ENTIRE_WORKTOP") None;
  `;
  console.debug("sell tx manifest:", manifest);
  return manifest;
}
