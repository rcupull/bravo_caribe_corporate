import React from "react";
import { Provider } from "react-redux";

import { Store } from "redux";

/**
 * How integrate redux store to SSR
 * https://vike.dev/stores
 */

export const ReduxProvider = ({
  children,
  store,
}: {
  children: React.ReactNode;
  store: Store;
}): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};
