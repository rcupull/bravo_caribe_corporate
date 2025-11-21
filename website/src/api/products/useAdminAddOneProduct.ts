import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args
  extends Pick<
    Product,
    | "name"
    | "price"
    | "description"
    | "currency"
    | "details"
    | "images"
    | "inStock"
    | "categoryType"
    | "specs"
  > {}

export const useAdminAddOneProduct = (): {
  adminAddOneProduct: FetchResource<Args>;
} => {
  return {
    adminAddOneProduct: useQueryMutation<Args, void>({
      fetch: async (data) => {
        const response = await axiosFetch({
          method: "post",
          url: getEndpoint({ path: "/admin/products" }),
          data,
        });
        return response.data;
      },
    }),
  };
};
