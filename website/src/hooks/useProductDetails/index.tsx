import { useModalPage } from "../useModalPage";
import { Product } from "@/types/products";
import { dynamic } from "@/utils/makeLazy";

//eslint-disable-next-line
const Component = dynamic(() => import("./Component").then((m) => m));

export const useProductDetails = () => {
  return {
    productDetails: useModalPage<{
      product: Product;
    }>(({ product }) => ({
      useProps: () => {
        const { name } = product;

        return {
          title: name,
          content: <Component product={product} />,
        };
      },
    })),
  };
};
