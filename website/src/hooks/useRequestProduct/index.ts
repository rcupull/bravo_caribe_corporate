import { Product } from "@/types/products";
import { useRouter } from "../useRouter";
import { getContactRoute } from "@/utils/routes";

export const useRequestProduct = () => {
  const { pushRoute } = useRouter();

  return {
    onRequest: (product?: Product) => {
      if (product) {
        const { productSlug } = product;
        return pushRoute(getContactRoute(), { productSlug });
      }
      pushRoute(getContactRoute());
    },
  };
};
