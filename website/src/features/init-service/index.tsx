import { useGlobalState } from "@/contexts/GlobalContext";
import { useEffect } from "react";
import { useLocalStorage } from "../local-storage";

export const InitService = () => {
  const { setUser } = useGlobalState();
  const { readLS } = useLocalStorage();

  useEffect(() => {
    const user = readLS("user");

    if (user) {
      setUser(user);
    }
  }, []);

  return null;
};
