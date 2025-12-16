import { usePageContext } from "@/hooks/usePageContext";
import { FetchResource } from "@/types/api";
import { Shopping } from "@/types/shopping";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

export const useRequestCart = (): {
  requestCart: FetchResource<void, Shopping | null>;
} => {
  const pageContext = usePageContext();

  return {
    requestCart: useQueryMutation<void, Shopping | null>({
      fetch: async () => {
        const response = await axiosFetch(
          {
            method: "post",
            url: getEndpoint({
              path: "/cart/request",
            }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
