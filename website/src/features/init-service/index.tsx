import { useGlobalState } from "@/contexts/GlobalContext";
import { useEffect } from "react";
import { getPersistentAuthData } from "@/utils/persistent-auth";

export const InitService = () => {
  const { setUser } = useGlobalState();

  useEffect(() => {
    getPersistentAuthData().then(({ user }) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return null;
};
