import axios from "axios";
import { getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";

export const useGetAllProducts = (): {
  getAllProducts: FetchResourceWithPagination<void, Product>;
} => {
  return {
    getAllProducts: useQueryMutationWithPagination<void, Product>({
      fetch: async () => {
        const response = await axios({
          method: "get",
          url: getEndpoint({ path: "/products" }),
        });
        return response.data;
      },
    }),
  };
};
