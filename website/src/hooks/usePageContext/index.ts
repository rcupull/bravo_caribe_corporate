import { PageContextServer } from "@/types/ssr";
import { usePageContext as usePageContextVike } from "vike-react/usePageContext";

export const usePageContext = () => {
  const pageContext = usePageContextVike();

  return pageContext as PageContextServer;
};
