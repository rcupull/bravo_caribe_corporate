import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductField } from "@/types/category-field";

interface Args {
  productFieldSlug: string;
  update: Pick<ProductField, "label">;
}

export const useUpdateOneProductField = (): {
  updateOneProductField: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    updateOneProductField: useQueryMutation<Args, void>({
      fetch: async ({ productFieldSlug, update }) => {
        const response = await axiosFetch(
          {
            method: "put",
            url: getEndpoint({
              path: "/product-fields/:productFieldSlug",
              urlParams: { productFieldSlug },
            }),
            data: update,
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
