import { ModalProvider } from "./modalContext";
import { ModalContainer } from "./ModalContainer";
import { ChildrenProp } from "@/types/general";

export const ModalService = ({ children }: ChildrenProp) => {
  return (
    <ModalProvider>
      <ModalContainer />
      {children}
    </ModalProvider>
  );
};
