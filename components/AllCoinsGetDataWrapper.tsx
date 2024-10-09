import { getAllTokensData, getMainComponentState } from "@/utils/api-calls";
import AllCoinsCards from "./AllCoinsCards";
// import AllCoinsCardsDeprecated from "./AllCoinsCardsDeprecated";

// get all coins on chain data
// executed server side
const getCoinData = async () => {
  const res = await getMainComponentState(
    process.env.NEXT_PUBLIC_COMPONENT_ADDRESS || ""
  );

  const allCoinsData = await getAllTokensData(res.tokensKvs);

  return allCoinsData;
};

// server-component
const AllCoinsGetDataWrapper = async () => {
  const allCoinsData = await getCoinData();

  // client-component
  // TODO: remove once implementation done
  // return <AllCoinsCardsDeprecated allCoinsData={allCoinsData} />;
  return <AllCoinsCards allCoinsData={allCoinsData} />;
};

export default AllCoinsGetDataWrapper;