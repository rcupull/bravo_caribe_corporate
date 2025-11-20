import { useGetOwnUser } from "@/api/user/useGetOwnUser";
import { useApiPersistent } from "@/features/redux/slices/useApiPersistent";

import { UserRole } from "@/types/auth";

export const useAuth = () => {
  const { getOwnUser } = useGetOwnUser();

  const { data, setData, resetData } = useApiPersistent("useAuth", getOwnUser);

  return {
    isAuthenticated: !!data,
    isAdmin: data?.role === UserRole.ADMIN,
    setData,
    resetData,
  };
};
