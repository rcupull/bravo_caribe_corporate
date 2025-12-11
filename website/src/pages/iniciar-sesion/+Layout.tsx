import { MainLayout } from "@/components/main-layout";

import { ChildrenProp } from "@/types/general";

export let Layout = ({ children }: ChildrenProp) => {
  return <MainLayout>{children}</MainLayout>;
};
