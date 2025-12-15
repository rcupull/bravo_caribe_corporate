import { ReduxState } from "@/types/redux";
import { createSimpleSlice } from "./utils";

export const slices = {
  useAuth: createSimpleSlice<ReduxState["useAuth"]>("useAuth", null),
  useCart: createSimpleSlice<ReduxState["useCart"]>("useCart", null),
};
