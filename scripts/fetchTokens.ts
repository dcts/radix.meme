// THIS IS NOT WORKING YET
// COULD NOT MAKE TS RUN AS SCRIPT 
import { getMainComponentState, getAllTokensData } from "../utils/api-calls"; // adjust path as needed

const runFetchTokens = async () => {
  try {
    const res = await getMainComponentState(
      process.env.NEXT_PUBLIC_COMPONENT_ADDRESS || ""
    );
    console.log({ res });
    const allCoinsData = await getAllTokensData(res.tokensKvs);
    console.log({ allCoinsData });
    return allCoinsData;

  } catch (error) {
    console.error("Error fetching tokens:", error);
  }
};

runFetchTokens();
