import type { TTokenData } from "../../../types";

import { devCoinsData } from "@/data";

type TProps = {
  params: {
    address: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getData = async (address: string) => {
  const token = devCoinsData.at(0) as TTokenData;
  // const gatewayApiClient = getGatewayApiClientOrThrow();
  // console.log({address});
  // const res = await gatewayApiClient.state.getEntityMetadata(address);
  // console.log({res});
  return token;
};

export async function generateMetadata({ params }: TProps) {
  const { address } = params;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = await getData(address);

  return {
    title: `DeXter Launchpad | Token | ${token.name}`,
    description: token.description,
  };
}

const page = async ({ params }: TProps) => {
  const { address } = params;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = await getData(address);

  return (
    <div>
      Token details/trade page
      <div>{token.name}</div>
      <div>{token.description}</div>
    </div>
  );
};

export default page;
