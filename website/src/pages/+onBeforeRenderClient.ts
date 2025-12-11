import { makerStore } from "@/features/redux/makeStore";
import { PageContextClient } from "@/types/ssr";

export const onBeforeRenderClient = (pageContext: PageContextClient) => {
  if (pageContext.storeInitialState) {
    /**
     * creating store when has storeInitialState(in SSR)
     * (the storeInitialState come from SSR server)
     * See: Store integration in vike docs
     */
    const { store } = makerStore(pageContext.storeInitialState);

    pageContext.store = store;
  }
};
