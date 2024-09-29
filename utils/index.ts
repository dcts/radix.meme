// transient
export const wait = (duration: number) =>
  new Promise((res) => {
    setTimeout(res, duration);
  });

// Shortens radix wallet address
export function shortenWalletAddress(address: string): string {
  // minimal length is 35 chars
  if (address.length < 35) {
    return address;
  }
  const firstPart = address.slice(0, 8);
  const lastPart = address.slice(-20);
  return `${firstPart}...${lastPart}`;
}
