import { PageContextServer } from "@/types/ssr";

export const onAfterRenderHtml = (pageContext: PageContextServer) => {
  if (pageContext.store) {
    /**
     * - getting the storeInitialState just afterrender the html in the server
     * - sending the storeInitialState to the client side
     * See: Store integration in vike docs
     */
    pageContext.storeInitialState = pageContext.store.getState();
  }
};
