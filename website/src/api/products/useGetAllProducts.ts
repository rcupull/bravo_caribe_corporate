import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { CategoryType } from "@/types/category";

interface Args {
  categoryType?: CategoryType;
  featured?: boolean;
}

export const useGetAllProducts = (): {
  getAllProducts: FetchResourceWithPagination<Args | void, Product>;
} => {
  return {
    getAllProducts: useQueryMutationWithPagination<Args | void, Product>({
      fetch: async (args = {}) => {
        const response = await axiosFetch({
          method: "get",
          url: getEndpoint({ path: "/products", query: { ...args } }),
        });
        return response.data;
      },
    }),
  };
};
