import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductCategory } from "@/types/product-category";

interface Args {
  productCategorySlug: string;
  update: Pick<ProductCategory, "description" | "name" | "productFieldIds">;
}

export const useUpdateOneProductCategory = (): {
  updateOneProductCategory: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    updateOneProductCategory: useQueryMutation<Args, void>({
      fetch: async ({ productCategorySlug, update }) => {
        const response = await axiosFetch(
          {
            method: "put",
            url: getEndpoint({
              path: "/product-categories/:productCategorySlug",
              urlParams: { productCategorySlug },
            }),
            data: update,
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
