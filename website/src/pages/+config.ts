import vikeReact from "vike-react/config";
import vikeReactQuery from "vike-react-query/config";

import type { Config } from "vike/types";

export default {
  reactStrictMode: false,
  favicon: "/logo.png",
  extends: [vikeReact, vikeReactQuery],
  ssr: true,
  passToClient: ["storeInitialState"],
} satisfies Config;
