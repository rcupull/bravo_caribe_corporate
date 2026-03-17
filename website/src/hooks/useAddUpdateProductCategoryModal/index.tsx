import { ProductCategory } from "@/types/product-category";
import { useModalPage } from "../useModalPage";
import { dynamic } from "@/utils/makeLazy";

//eslint-disable-next-line
const Component = dynamic(() => import("./Component").then((m) => m));

export const useAddUpdateProductCategoryModal = () => {
  return {
    addUpdateProductCategoryModal: useModalPage<{
      productCategory?: ProductCategory;
      onRefresh: () => void;
    }>(({ onRefresh, productCategory }) => ({
      useProps: () => {
        return {
          title: productCategory ? "Editar categoría" : "Agregar categoría",
          description: productCategory
            ? "Completa el formulario para editar la categoría"
            : "Completa el formulario para agregar una nueva categoría",
          content: (
            <Component
              productCategory={productCategory}
              onRefresh={onRefresh}
            />
          ),
          className: "!max-w-lg",
        };
      },
    })),
  };
};
