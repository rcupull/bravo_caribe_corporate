import { LayoutContainer } from "@/components/layout-container";
import { LayoutSimple } from "@/components/layout-simple";
import { Navigate } from "@/components/navigate";
import { useAuth } from "@/hooks/useAuth";
import { ChildrenProp } from "@/types/general";
import { getSignInRoute } from "@/utils/routes";

export const Layout = ({ children }: ChildrenProp) => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to={getSignInRoute()} />;
  }

  return <LayoutContainer>{children}</LayoutContainer>;
};
