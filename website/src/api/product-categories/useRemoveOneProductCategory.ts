import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  productCategorySlug: string;
}

export const useRemoveOneProductCategory = (): {
  removeOneProductCategory: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    removeOneProductCategory: useQueryMutation<Args, void>({
      fetch: async ({ productCategorySlug }) => {
        const response = await axiosFetch(
          {
            method: "delete",
            url: getEndpoint({
              path: "/product-categories/:productCategorySlug",
              urlParams: {
                productCategorySlug,
              },
            }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
