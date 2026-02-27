import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductCategory } from "@/types/product-category";

interface Args extends Pick<
  ProductCategory,
  "description" | "name" | "productFieldIds"
> {}

export const useAddOneProductCategory = (): {
  addOneProductCategory: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    addOneProductCategory: useQueryMutation<Args, void>({
      fetch: async (data) => {
        const response = await axiosFetch(
          {
            method: "post",
            url: getEndpoint({ path: "/product-categories" }),
            data,
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
