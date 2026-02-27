import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductCategory } from "@/types/product-category";

interface Args {
  productCategorySlug: string;
}

export const useGetOneProductCategory = (): {
  getOneProductCategory: FetchResource<Args, ProductCategory>;
} => {
  const pageContext = usePageContext();
  return {
    getOneProductCategory: useQueryMutation<Args, ProductCategory>({
      fetch: async ({ productCategorySlug }) => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({
              path: "/product-categories/:productCategorySlug",
              urlParams: { productCategorySlug },
            }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
