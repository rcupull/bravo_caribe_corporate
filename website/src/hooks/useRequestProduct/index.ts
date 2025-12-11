import { Product } from "@/types/products";
import { useRouter } from "../useRouter";

export const useRequestProduct = () => {
  const { pushRoute } = useRouter();

  return {
    onRequest: (product?: Product) => {
      if (product) {
        const { productSlug } = product;
        return pushRoute(`/contacto?productSlug=${productSlug}`);
      }
      pushRoute("/contacto");
    },
  };
};
