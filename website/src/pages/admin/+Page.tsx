import { Navigate } from "@/components/navigate";
import { AdminSection } from "./types";

export const Page = () => {
  return <Navigate to={`/admin/${AdminSection.PRODUCTS}`} />;
};
