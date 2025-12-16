import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { usePageContext } from "@/hooks/usePageContext";
import { Shopping } from "@/types/shopping";
import { FetchResourceWithPagination } from "@/types/api";
import { AnyRecord } from "@/types/general";

export const useAdminGetAllShopping = (): {
  adminGetAllShopping: FetchResourceWithPagination<AnyRecord, Shopping>;
} => {
  const pageContext = usePageContext();

  return {
    adminGetAllShopping: useQueryMutationWithPagination<AnyRecord, Shopping>({
      fetch: async (query = {}) => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({
              path: "/admin/shoppings",
              query: { ...query },
            }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
