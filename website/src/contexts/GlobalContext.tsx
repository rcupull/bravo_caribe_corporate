import { User } from "@/types/auth";
import { ChildrenProp } from "@/types/general";
import { createContext, useContext, useState } from "react";

interface GlobalState {
  user?: User;
}

const defaultState: GlobalState = {
  user: undefined,
};

interface GlobalValue extends GlobalState {
  setUser: (user: GlobalState["user"]) => void;
}

const GlobalContext = createContext<GlobalValue>({
  ...defaultState,
  setUser: () => {},
});

export const useGlobalState = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: ChildrenProp) => {
  const [state, setState] = useState<GlobalState>(defaultState);

  const value: GlobalValue = {
    ...state,
    setUser: (user) => setState((state) => ({ ...state, user })),
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
