import { LayoutAuth } from "@/components/layout-auth";

import { ChildrenProp } from "@/types/general";

export let Layout = ({ children }: ChildrenProp) => {
  return <LayoutAuth>{children}</LayoutAuth>;
};
