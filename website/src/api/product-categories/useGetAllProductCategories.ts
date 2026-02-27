import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductCategory } from "@/types/product-category";

export const useGetAllProductCategories = (): {
  getAllProductCategories: FetchResourceWithPagination<void, ProductCategory>;
} => {
  const pageContext = usePageContext();
  return {
    getAllProductCategories: useQueryMutationWithPagination<
      void,
      ProductCategory
    >({
      fetch: async () => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({ path: "/product-categories" }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
