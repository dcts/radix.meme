import { Subscription } from "rxjs";
import {
  DataRequestBuilder,
  RadixDappToolkit,
  RadixNetwork,
} from "@radixdlt/radix-dapp-toolkit";
import { userSlice, WalletData } from "./userSlice";
import { AppStore } from "./store";

export type RDT = ReturnType<typeof RadixDappToolkit>;

let rdtInstance: null | RDT = null;

export function getRdt() {
  return rdtInstance;
}

export function getRdtOrThrow() {
  const rdt = getRdt();
  if (!rdt) {
    throw new Error("RDT initialization failed");
  }
  return rdt;
}

function setRdt(rdt: RDT) {
  rdtInstance = rdt;
}

let subs: Subscription[] = [];

export function initializeSubscriptions(store: AppStore) {
  rdtInstance = RadixDappToolkit({
    dAppDefinitionAddress:
      "account_tdx_2_129kev9w27tsl7qjg0dlyze70kxnlzycs8v2c85kzec40gg8mt73f7y",
    networkId: RadixNetwork.Stokenet,
    featureFlags: ["ExperimentalMobileSupport"],
  });
  rdtInstance.walletApi.setRequestData(
    DataRequestBuilder.accounts().exactly(1)
  );
  subs.push(
    rdtInstance.walletApi.walletData$.subscribe((walletData: WalletData) => {
      const data: WalletData = JSON.parse(JSON.stringify(walletData));
      store.dispatch(userSlice.actions.setWalletData(data));
    })
  );
  setRdt(rdtInstance);

  // Set connect button theme
  rdtInstance.buttonApi.setTheme("black");

  console.log("INITIALIZATION DONE");
}

export function unsubscribeAll() {
  subs.forEach((sub) => {
    sub.unsubscribe();
  });
  subs = [];
}
