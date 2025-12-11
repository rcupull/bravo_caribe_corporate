import { FunctionComponent } from "react";

import { PersistentProvider } from ".";
import { ChildrenProp } from "@/types/general";

export const withPersistentProvider = (
  Component: FunctionComponent<ChildrenProp>
) => {
  const NewComponent = ({ children }: ChildrenProp) => (
    <PersistentProvider>
      <Component>{children}</Component>
    </PersistentProvider>
  );

  return NewComponent;
};
