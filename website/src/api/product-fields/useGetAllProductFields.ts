import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductField } from "@/types/category-field";

export const useGetAllProductFields = (): {
  getAllProductFields: FetchResourceWithPagination<void, ProductField>;
} => {
  const pageContext = usePageContext();
  return {
    getAllProductFields: useQueryMutationWithPagination<void, ProductField>({
      fetch: async () => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({ path: "/product-fields" }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
