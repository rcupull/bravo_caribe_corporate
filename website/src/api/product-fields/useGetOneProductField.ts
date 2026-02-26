import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";
import { ProductField } from "@/types/category-field";

interface Args {
  productFieldSlug: string;
}

export const useGetOneProductField = (): {
  getOneProductField: FetchResource<Args, ProductField>;
} => {
  const pageContext = usePageContext();
  return {
    getOneProductField: useQueryMutation<Args, ProductField>({
      fetch: async ({ productFieldSlug }) => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({
              path: "/product-fields/:productFieldSlug",
              urlParams: { productFieldSlug },
            }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
