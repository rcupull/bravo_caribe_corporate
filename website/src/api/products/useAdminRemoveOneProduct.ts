import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  productSlug: string;
}

export const useAdminRemoveOneProduct = (): {
  adminRemoveOneProduct: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    adminRemoveOneProduct: useQueryMutation<Args, void>({
      fetch: async ({ productSlug }) => {
        const response = await axiosFetch(
          {
            method: "delete",
            url: getEndpoint({
              path: "/admin/products/:productSlug",
              urlParams: {
                productSlug,
              },
            }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
