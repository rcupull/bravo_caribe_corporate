import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination, PaginationQuery } from "@/types/api";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductCategory } from "@/types/product-category";
import { defaultPaginationQuery } from "@/types/pagination";

interface Args extends PaginationQuery {}

export const useGetAllProductCategories = (): {
  getAllProductCategories: FetchResourceWithPagination<
    void | Args,
    ProductCategory
  >;
} => {
  const pageContext = usePageContext();
  return {
    getAllProductCategories: useQueryMutationWithPagination<
      void | Args,
      ProductCategory
    >({
      fetch: async (args = {}) => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({
              path: "/product-categories",
              query: { ...defaultPaginationQuery, ...args },
            }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
