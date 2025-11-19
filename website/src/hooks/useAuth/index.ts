import { useGlobalState } from "@/contexts/GlobalContext";

import { UserRole } from "@/types/auth";

export const useAuth = () => {
  const { user } = useGlobalState();

  return {
    isAuthenticated: !!user,
    isAdmin: user?.role === UserRole.ADMIN,
  };
};
