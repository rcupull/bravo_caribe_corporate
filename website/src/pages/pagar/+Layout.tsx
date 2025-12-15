import { LayoutSimple } from "@/components/layout-simple";
import { Navigate } from "@/components/navigate";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/hooks/useRouter";
import { ChildrenProp } from "@/types/general";
import { getSignInRoute } from "@/utils/routes";

export const Layout = ({ children }: ChildrenProp) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useRouter();

  if (!isAuthenticated) {
    return <Navigate to={getSignInRoute()} query={{ redirect: pathname }} />;
  }

  return <LayoutSimple>{children}</LayoutSimple>;
};
