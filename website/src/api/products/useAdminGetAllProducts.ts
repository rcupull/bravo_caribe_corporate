import axios from "axios";
import { getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";

export const useAdminGetAllProducts = (): {
  adminGetAllProducts: FetchResourceWithPagination<void, Product>;
} => {
  return {
    adminGetAllProducts: useQueryMutationWithPagination<void, Product>({
      fetch: async () => {
        const response = await axios({
          method: "get",
          url: getEndpoint({ path: "/admin/products" }),
        });
        return response.data;
      },
    }),
  };
};
