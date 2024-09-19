// import type { TToken } from "../../../types";

type TProps = {
  params: {
    address: string;
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getData = async (address: string) => {
  const token = undefined;
  return token;
};

const page = async ({ params }: TProps) => {
  const { address } = params;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = await getData(address);

  return <div>Token details/trade page</div>;
};

export default page;
