import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  productSlug: string;
  update: Pick<
    Product,
    | "name"
    | "price"
    | "description"
    | "currency"
    | "details"
    | "images"
    | "inStock"
  >;
}

export const useAdminUpdateOneProduct = (): {
  adminUpdateOneProduct: FetchResource<Args>;
} => {
  return {
    adminUpdateOneProduct: useQueryMutation<Args, void>({
      fetch: async ({ productSlug, update }) => {
        const response = await axiosFetch({
          method: "put",
          url: getEndpoint({
            path: "/admin/products/:productSlug",
            urlParams: { productSlug },
          }),
          data: update,
        });
        return response.data;
      },
    }),
  };
};
