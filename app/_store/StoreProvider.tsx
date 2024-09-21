"use client";

import { Provider } from "react-redux";
import store from "./index";

type TProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: TProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
