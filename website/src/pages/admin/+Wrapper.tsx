import { Navigate } from "@/components/navigate";
import { useAuth } from "@/hooks/useAuth";
import { ChildrenProp } from "@/types/general";
import { getSignInRoute } from "@/utils/routes";

export const Wrapper = ({ children }: ChildrenProp) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to={getSignInRoute()} />;
  }

  return <>{children}</>;
};
