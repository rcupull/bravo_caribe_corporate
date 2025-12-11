import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  productSlug?: string;
}

export const useGetOneProduct = (): {
  getOneProduct: FetchResource<Args, Product>;
} => {
  const pageContext = usePageContext();
  return {
    getOneProduct: useQueryMutation<Args, Product>({
      fetch: async ({ productSlug }) => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({
              path: "/products/:productSlug",
              urlParams: { productSlug },
            }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
