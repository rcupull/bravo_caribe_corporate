import { usePageContext } from "@/hooks/usePageContext";
import { FetchResource } from "@/types/api";
import { Shopping } from "@/types/shopping";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

export const useCartAddPurchaser = (): {
  cartAddPurchaser: FetchResource<void, Shopping | null>;
} => {
  const pageContext = usePageContext();

  return {
    cartAddPurchaser: useQueryMutation<void, Shopping | null>({
      fetch: async () => {
        const response = await axiosFetch(
          {
            method: "post",
            url: getEndpoint({
              path: "/cart/add-purchaser",
            }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
