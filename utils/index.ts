// Add global variables
export const XRD_FEE_ALLOWANCE = 3;
export const XRD_AMOUNT_PRECISION = 2;
export const MEMECOIN_AMOUNT_PRECISION = 4;

// transient
export const wait = (duration: number) =>
  new Promise((res) => {
    setTimeout(res, duration);
  });

// utility function to shorten any string to an abbreviated version
// useful for showing long strings like on-ledger addresses and tx hashes
// e.g. default settings will shorten the string "uweriugcwieywegwe864r8dt864g3g487t5rgd34df384t" to "uwer...394t"
export function shortenString(
  fullStr: string, // the string you want to shorten
  showStart: number = 4, // how many chars of the string to show at the start of the abbreviation
  showEnd: number = showStart, // how many chars to show at the end of the abbreviation
  seperator: string = "..." // the chars to show in the middle of the abbreviation
): string {
  if (!fullStr || fullStr.length <= showStart + showEnd + 2) {
    return fullStr;
  } else {
    return (
      fullStr.slice(0, showStart) +
      (showEnd > 0 ? seperator + fullStr.slice(-showEnd) : "")
    );
  }
}

export function truncateWithPrecision(num: number, precision: number): number {
  const split = num.toFixed(18).split(".");
  if (split.length !== 2) {
    return num;
  }
  const [part1, part2] = split;
  return Number(`${part1}.${part2.substring(0, precision)}`);
}

export function displayNumber(value: number): string {
  return value.toLocaleString("en").replaceAll(",", "'")
}