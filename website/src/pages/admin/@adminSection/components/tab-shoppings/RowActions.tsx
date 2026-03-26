import { Button } from "@/components/ui/button";

import { Edit, Trash2 } from "lucide-react";
import { Product } from "@/types/products";
import { useAddUpdateProductModal } from "@/hooks/useAddUpdateProductModal";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { useAdminRemoveOneProduct } from "@/api/products/useAdminRemoveOneProduct";
import { useToast } from "@/hooks/use-toast";

interface RowActionsProps {
  rowData: Product;
  onRefresh: () => void;
}

export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { addUpdateProductModal } = useAddUpdateProductModal();
  const { pushModal } = useModal();

  const { toast } = useToast();

  const { productSlug } = rowData;

  const handleProductDelete = () => {
    pushModal({
      useProps: () => {
        const { adminRemoveOneProduct } = useAdminRemoveOneProduct();
        const { onClose } = useModal();
        return {
          title: "Confirmar",
          content: <div>Segiro que desean eliminar este producto</div>,
          closeButton: <ButtonClose />,
          primaryBtn: (
            <Button
              onClick={() => {
                adminRemoveOneProduct.fetch(
                  { productSlug },
                  {
                    onAfterSuccess: () => {
                      toast({
                        title: "Producto eliminado exitosamente",
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
          addUpdateProductModal.open({ onRefresh, product: rowData });
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
