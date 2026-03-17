import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  productFieldSlug: string;
}

export const useRemoveOneProductField = (): {
  removeOneProductField: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    removeOneProductField: useQueryMutation<Args, void>({
      fetch: async ({ productFieldSlug }) => {
        const response = await axiosFetch(
          {
            method: "delete",
            url: getEndpoint({
              path: "/product-fields/:productFieldSlug",
              urlParams: {
                productFieldSlug,
              },
            }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
