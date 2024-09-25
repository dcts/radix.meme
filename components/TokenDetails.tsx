"use client";

type TProps = {
  tokenAddress: string;
};

const TokenDetails = ({ tokenAddress }: TProps) => {
  console.log("tokenAddress", tokenAddress);

  // useEffect fetch token data

  return (
    <div>
      {/* <div>{token.name}</div>
      <div>{token.description}</div> */}
    </div>
  );
};

export default TokenDetails;
