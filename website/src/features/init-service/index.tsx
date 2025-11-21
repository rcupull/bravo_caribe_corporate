import { useEffect } from "react";
import { getPersistentAuthData } from "@/utils/persistent-auth";
import { useAuth } from "@/hooks/useAuth";

export const InitService = () => {
  const { setData } = useAuth();

  useEffect(() => {
    getPersistentAuthData().then(({ user }) => {
      if (user) {
        setData(user);
      }
    });
  }, []);

  return null;
};
