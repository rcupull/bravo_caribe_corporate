import { LayoutSimple } from "@/components/layout-simple";
import { ChildrenProp } from "@/types/general";

export const Layout = ({ children }: ChildrenProp) => {
  return <LayoutSimple>{children}</LayoutSimple>;
};
