import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InitService } from "../features/init-service";
import { ReduxProvider } from "../features/redux";
import { ChildrenProp } from "../types/general";
import { useEffect, useState } from "react";
import { getInitialStore } from "../features/redux/getInitialStore";
import { ModalService } from "../features/modal";
import { usePageContext } from "../hooks/usePageContext";
import "./index.css";

const queryClient = new QueryClient();

export const Wrapper = ({ children }: ChildrenProp) => {
  const pageContext = usePageContext();

  /**
   * setting store when ssr is enabled
   * (the store is created in onBeforeRenderClient)
   */
  const [store, setStore] = useState(pageContext.store);

  useEffect(() => {
    const createReduxStoreInBrowser = async () => {
      /**
       * setting store when SSR is disabled
       * (the store is created just here)
       */
      const { store } = await getInitialStore({ pageContext });
      setStore(store);
    };

    createReduxStoreInBrowser();
  }, []);

  if (!store) return null;

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ModalService>
            <InitService />
            <Toaster />
            <Sonner />
            {children}
          </ModalService>
        </TooltipProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};
