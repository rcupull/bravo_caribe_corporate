import { ChildrenProp } from "@/types/general";
import { persistentBackdoor, PersistentContext } from "./Context";
import { PersistentUtils } from "./types";

import Cookies from "universal-cookie";

const getCookiesClient = () => {
  if (process.env.NODE_ENV === "development") {
    return new Cookies(null, {
      path: "/",
      domain: ".bravocaribe.com",
      sameSite: "lax",
    });
  }

  return new Cookies(null, {
    path: "/",
    secure: true,
    sameSite: "none",
    domain: ".bravocaribe.com",
  });
};

const cookies = getCookiesClient();

export const Provider = ({ children }: ChildrenProp) => {
  const setPersistent: PersistentUtils["setPersistent"] = async (
    name,
    value
  ) => {
    cookies.set(name, value);
  };

  const getPersistent: PersistentUtils["getPersistent"] = async (key) => {
    return cookies.get(key);
  };

  const removePersistent: PersistentUtils["removePersistent"] = async (key) => {
    cookies.remove(key);
  };

  persistentBackdoor.getPersistent = getPersistent;
  persistentBackdoor.setPersistent = setPersistent;
  persistentBackdoor.removePersistent = removePersistent;

  return (
    <PersistentContext.Provider
      value={{
        getPersistent,
        removePersistent,
        setPersistent,
      }}
    >
      {children}
    </PersistentContext.Provider>
  );
};
