import { Button } from "@/components/ui/button";

import { Edit, Trash2 } from "lucide-react";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { toast } from "sonner";
import { useAddUpdateProductCategoryModal } from "@/hooks/useAddUpdateProductCategoryModal";
import { ProductCategory } from "@/types/product-category";
import { useRemoveOneProductCategory } from "@/api/product-categories/useRemoveOneProductCategory";
import { useToast } from "@/hooks/use-toast";

interface RowActionsProps {
  rowData: ProductCategory;
  onRefresh: () => void;
}

export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { addUpdateProductCategoryModal } = useAddUpdateProductCategoryModal();

  const { pushModal } = useModal();
  const { toast } = useToast();

  const { productCategorySlug } = rowData;

  const handleProductDelete = () => {
    pushModal({
      useProps: () => {
        const { removeOneProductCategory } = useRemoveOneProductCategory();
        const { onClose } = useModal();
        return {
          title: "Confirmar",
          content: <div>Seguro que desean eliminar este campo de producto</div>,
          closeButton: <ButtonClose />,
          primaryBtn: (
            <Button
              onClick={() => {
                removeOneProductCategory.fetch(
                  { productCategorySlug },
                  {
                    onAfterSuccess: () => {
                      toast({
                        title: "Categoría eliminada exitosamente",
                        variant: "success",
                      });

                      onRefresh();
                      onClose();
                    },
                  },
                );
              }}
            >
              Eliminar
            </Button>
          ),
        };
      },
    });
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          addUpdateProductCategoryModal.open({
            onRefresh,
            productCategory: rowData,
          });
        }}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          handleProductDelete();
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
