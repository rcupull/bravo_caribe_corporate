import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination, PaginationQuery } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { usePageContext } from "@/hooks/usePageContext";

interface Args extends PaginationQuery {
  search?: string;
  categorySlugs?: Array<string>;
}

export const useAdminGetAllProducts = (): {
  adminGetAllProducts: FetchResourceWithPagination<Args, Product>;
} => {
  const pageContext = usePageContext();
  return {
    adminGetAllProducts: useQueryMutationWithPagination<Args, Product>({
      fetch: async (query = {}) => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({
              path: "/admin/products",
              query: { ...query },
            }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
