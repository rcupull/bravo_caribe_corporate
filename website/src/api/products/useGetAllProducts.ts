import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  categorySlugs?: Array<string>;
  inStockOnly?: boolean;
  featured?: boolean;
  page?: number;
  search?: string;
}

export const useGetAllProducts = (): {
  getAllProducts: FetchResourceWithPagination<Args | void, Product>;
} => {
  const pageContext = usePageContext();
  return {
    getAllProducts: useQueryMutationWithPagination<Args | void, Product>({
      fetch: async (args = {}) => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({ path: "/products", query: { ...args } }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
