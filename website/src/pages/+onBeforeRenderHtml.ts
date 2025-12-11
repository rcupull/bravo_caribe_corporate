import { getInitialStore } from "@/features/redux/getInitialStore";
import { PageContextServer } from "@/types/ssr";

export const onBeforeRenderHtml = async (pageContext: PageContextServer) => {
  /**
   * creating store in SSR server. This store is used to render the html in the server and
   * the redux state is sent to client in onAfterRenderHtml.
   * See: Store integration in vike docs
   */
  const { store } = await getInitialStore({ pageContext });

  pageContext.store = store;
};
