import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Edit, Trash2 } from "lucide-react";
import { DialogProductForm } from "./DialogProductForm";
import { Product } from "@/types/products";

interface RowActionsProps {
  rowData: Product;
  onRefresh: () => void;
}

export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const handleProductDelete = (id: string) => {
    // if (confirm("¿Estás seguro de eliminar este producto?")) {
    //   const updatedProducts = products.filter((p) => p.id !== id);
    //   saveProducts(updatedProducts);
    //   toast.success("Producto eliminado exitosamente");
    // }
  };

  return (
    <div className="flex gap-2 justify-end">
      <DialogProductForm
        open={isProductDialogOpen}
        onOpenChange={setIsProductDialogOpen}
        product={rowData}
        onRefresh={onRefresh}
      />
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setIsProductDialogOpen(true);
        }}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          handleProductDelete(rowData._id);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
