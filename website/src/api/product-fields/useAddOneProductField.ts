import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductField } from "@/types/category-field";

interface Args extends Pick<ProductField, "field" | "label" | "type"> {}

export const useAddOneProductField = (): {
  addOneProductField: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    addOneProductField: useQueryMutation<Args, void>({
      fetch: async (data) => {
        const response = await axiosFetch(
          {
            method: "post",
            url: getEndpoint({ path: "/product-fields" }),
            data,
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
