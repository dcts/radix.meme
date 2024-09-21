"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { initializeSubscriptions, unsubscribeAll } from "./subscriptions";
import { store } from "./store";

type TProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: TProps) => {
  // Initialize store
  useEffect(() => {
    initializeSubscriptions(store);
    return () => {
      unsubscribeAll();
    };
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
