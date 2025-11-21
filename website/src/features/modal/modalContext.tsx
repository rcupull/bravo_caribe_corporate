import { createContext, useState } from "react";
import { ModalData } from "./types";
import { ChildrenProp } from "@/types/general";

type ModalsData = Array<ModalData>;

interface ModalServiceState {
  modalsData: ModalsData;
  setModalsData: React.Dispatch<React.SetStateAction<ModalsData>>;
}

export const ModalContext = createContext<ModalServiceState>({
  modalsData: [],
  setModalsData: () => {},
});

export const ModalProvider = ({ children }: ChildrenProp) => {
  const [modalsData, setModalsData] = useState<ModalsData>([]);

  return (
    <ModalContext.Provider
      value={{
        modalsData,
        setModalsData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
