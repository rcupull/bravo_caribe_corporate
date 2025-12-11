import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReduxProvider } from "../features/redux";
import { ChildrenProp } from "../types/general";
import { useMemo } from "react";
import { ModalService } from "../features/modal";
import { usePageContext } from "../hooks/usePageContext";
import "./index.css";
import { withPersistentProvider } from "@/features/persistent/withPersistentProvider";

const queryClient = new QueryClient();

export let Wrapper = ({ children }: ChildrenProp) => {
  const pageContext = usePageContext();

  const store = useMemo(() => pageContext.store, []);

  if (!store) return null;

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ModalService>
            <Toaster />
            <Sonner />
            {children}
          </ModalService>
        </TooltipProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
};

Wrapper = withPersistentProvider(Wrapper);
