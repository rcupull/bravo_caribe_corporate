import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { InitService } from "./features/init-service";
import { ReduxProvider } from "./features/redux";
import { ChildrenProp } from "./types/general";
import { useEffect, useState } from "react";
import { getInitialStore } from "./features/redux/getInitialStore";
import { Store } from "@reduxjs/toolkit";
import { ModalService } from "./features/modal";

const queryClient = new QueryClient();

export const Providers = ({ children }: ChildrenProp) => {
  /**
   * setting store when ssr is enabled
   * (the store is created in onBeforeRenderClient)
   */
  const [store, setStore] = useState<Store>();

  useEffect(() => {
    const createReduxStoreInBrowser = async () => {
      /**
       * setting store when SSR is disabled
       * (the store is created just here)
       */
      const { store } = await getInitialStore();
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
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>{children}</BrowserRouter>
            </CartProvider>
          </ModalService>
        </TooltipProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};
