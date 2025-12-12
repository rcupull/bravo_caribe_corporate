import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";

interface Args
  extends Pick<
    Product,
    | "name"
    | "price"
    | "currency"
    | "images"
    | "stockAmount"
    | "categoryType"
    | "specs"
    | "featured"
  > {}

export const useAdminAddOneProduct = (): {
  adminAddOneProduct: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    adminAddOneProduct: useQueryMutation<Args, void>({
      fetch: async (data) => {
        const response = await axiosFetch(
          {
            method: "post",
            url: getEndpoint({ path: "/admin/products" }),
            data,
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
