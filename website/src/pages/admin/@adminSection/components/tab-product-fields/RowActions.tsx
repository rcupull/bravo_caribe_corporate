import { Button } from "@/components/ui/button";

import { Edit, Trash2 } from "lucide-react";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { toast } from "sonner";
import { useAddUpdateProductFieldModal } from "@/hooks/useAddUpdateProductFieldModal";
import { ProductField } from "@/types/product-field";
import { useRemoveOneProductField } from "@/api/product-fields/useRemoveOneProductField";

interface RowActionsProps {
  rowData: ProductField;
  onRefresh: () => void;
}

export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { addUpdateProductFieldModal } = useAddUpdateProductFieldModal();

  const { pushModal } = useModal();

  const { productFieldSlug } = rowData;

  const handleProductDelete = () => {
    pushModal({
      useProps: () => {
        const { removeOneProductField } = useRemoveOneProductField();
        const { onClose } = useModal();
        return {
          title: "Confirmar",
          content: <div>Seguro que desean eliminar este campo de producto</div>,
          closeButton: <ButtonClose />,
          primaryBtn: (
            <Button
              onClick={() => {
                removeOneProductField.fetch(
                  { productFieldSlug },
                  {
                    onAfterSuccess: () => {
                      toast.success("Campo de producto eliminado exitosamente");

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
          addUpdateProductFieldModal.open({ onRefresh, productField: rowData });
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
