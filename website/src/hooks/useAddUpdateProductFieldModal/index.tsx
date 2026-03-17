import { ProductField } from "@/types/product-field";
import { useModalPage } from "../useModalPage";
import { Product } from "@/types/products";
import { dynamic } from "@/utils/makeLazy";

//eslint-disable-next-line
const Component = dynamic(() => import("./Component").then((m) => m));

export const useAddUpdateProductFieldModal = () => {
  return {
    addUpdateProductFieldModal: useModalPage<{
      productField?: ProductField;
      onRefresh: () => void;
    }>(({ onRefresh, productField }) => ({
      useProps: () => {
        return {
          title: productField
            ? "Editar campo de categoría"
            : "Agregar campo de categoría",
          description: productField
            ? "Completa el formulario para editar el campo de categoría"
            : "Completa el formulario para agregar un nuevo campo de categoría",
          content: (
            <Component productField={productField} onRefresh={onRefresh} />
          ),
          className: "!max-w-lg",
        };
      },
    })),
  };
};
