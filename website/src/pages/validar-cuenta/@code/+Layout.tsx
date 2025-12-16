import { LayoutAuth } from "@/components/layout-auth";
import { ChildrenProp } from "@/types/general";

export const Layout = ({ children }: ChildrenProp) => {
  return <LayoutAuth>{children}</LayoutAuth>;
};
