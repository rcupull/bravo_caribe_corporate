import { usePageContext } from "@/hooks/usePageContext";
import { FetchResource } from "@/types/api";
import { Shopping } from "@/types/shopping";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  productId: string;
}
export const useCartRemoveProduct = (): {
  cartRemoveProduct: FetchResource<Args, Shopping | null>;
} => {
  const pageContext = usePageContext();

  return {
    cartRemoveProduct: useQueryMutation<Args, Shopping | null>({
      fetch: async ({ productId }) => {
        const response = await axiosFetch(
          {
            method: "delete",
            url: getEndpoint({
              path: "/cart/products/:productId",
              urlParams: { productId },
            }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
