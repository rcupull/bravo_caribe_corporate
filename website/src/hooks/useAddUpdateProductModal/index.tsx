import { useModalPage } from "../useModalPage";
import { Product } from "@/types/products";
import { dynamic } from "@/utils/makeLazy";

//eslint-disable-next-line
const Component = dynamic(() => import("./Component").then((m) => m));

export const useAddUpdateProductModal = () => {
  return {
    addUpdateProductModal: useModalPage<{
      product?: Product;
      onRefresh: () => void;
    }>(({ onRefresh, product }) => ({
      useProps: () => {
        return {
          title: product ? "Editar Producto" : "Nuevo Producto",
          description: product
            ? "Modifica los datos del producto"
            : "Completa el formulario para agregar un nuevo producto",
          content: <Component product={product} onRefresh={onRefresh} />,
        };
      },
    })),
  };
};
