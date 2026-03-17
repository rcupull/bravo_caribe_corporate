import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination, PaginationQuery } from "@/types/api";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductField } from "@/types/product-field";
import { defaultPaginationQuery } from "@/types/pagination";

interface Args extends PaginationQuery {}

export const useGetAllProductFields = (): {
  getAllProductFields: FetchResourceWithPagination<void | Args, ProductField>;
} => {
  const pageContext = usePageContext();
  return {
    getAllProductFields: useQueryMutationWithPagination<
      void | Args,
      ProductField
    >({
      fetch: async (args = {}) => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({
              path: "/product-fields",
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
