import { usePageContext } from "@/hooks/usePageContext";
import { FetchResource } from "@/types/api";
import { Shopping } from "@/types/shopping";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

export interface CartAddArgs {
  productId: string;
  amountToAdd?: number;
}

export const useUpdateAddCart = (): {
  updateAddCart: FetchResource<CartAddArgs, Shopping | null>;
} => {
  const pageContext = usePageContext();

  return {
    updateAddCart: useQueryMutation<CartAddArgs, Shopping | null>({
      fetch: async ({ productId, amountToAdd }) => {
        const response = await axiosFetch(
          {
            method: "post",
            url: getEndpoint({
              path: "/cart/products/:productId",
              urlParams: { productId },
            }),
            data: {
              amountToAdd,
            },
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
