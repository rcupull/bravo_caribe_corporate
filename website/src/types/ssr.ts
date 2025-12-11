import type { ReduxState } from "./redux";

import type { EnhancedStore } from "@reduxjs/toolkit";
import type { Store } from "redux";
import type {
  PageContextClient as PageContextClientVike,
  PageContextServer as PageContextServerVike,
} from "vike/types";

export interface PageContextServer extends PageContextServerVike {
  store?: Store | EnhancedStore;
  storeInitialState?: Partial<ReduxState>;
  headers: Record<string, string> & { cookie?: string };
}

export interface PageContextClient extends PageContextClientVike {
  store?: Store | EnhancedStore;
  storeInitialState?: Partial<ReduxState>;
}
