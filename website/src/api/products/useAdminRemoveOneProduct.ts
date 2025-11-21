import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  productSlug: string;
}

export const useAdminRemoveOneProduct = (): {
  adminRemoveOneProduct: FetchResource<Args>;
} => {
  return {
    adminRemoveOneProduct: useQueryMutation<Args, void>({
      fetch: async ({ productSlug }) => {
        const response = await axiosFetch({
          method: "delete",
          url: getEndpoint({
            path: "/admin/products/:productSlug",
            urlParams: {
              productSlug,
            },
          }),
        });
        return response.data;
      },
    }),
  };
};
