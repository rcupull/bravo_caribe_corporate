import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { Product } from "@/types/products";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  productSlug: string;
  update: Pick<
    Product,
    | "name"
    | "price"
    | "currency"
    | "images"
    | "stockAmount"
    | "categoryType"
    | "specs"
    | "featured"
  >;
}

export const useAdminUpdateOneProduct = (): {
  adminUpdateOneProduct: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    adminUpdateOneProduct: useQueryMutation<Args, void>({
      fetch: async ({ productSlug, update }) => {
        const response = await axiosFetch(
          {
            method: "put",
            url: getEndpoint({
              path: "/admin/products/:productSlug",
              urlParams: { productSlug },
            }),
            data: update,
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
