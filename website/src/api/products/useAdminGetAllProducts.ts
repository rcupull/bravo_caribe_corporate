import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { usePageContext } from "@/hooks/usePageContext";

export const useAdminGetAllProducts = (): {
  adminGetAllProducts: FetchResourceWithPagination<void, Product>;
} => {
  const pageContext = usePageContext();
  return {
    adminGetAllProducts: useQueryMutationWithPagination<void, Product>({
      fetch: async () => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({ path: "/admin/products" }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
