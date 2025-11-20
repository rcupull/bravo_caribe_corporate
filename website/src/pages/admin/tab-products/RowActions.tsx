import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, RefreshCcw } from "lucide-react";
import { Formux } from "@/components/ui/formux";
import { FieldInput } from "@/components/ui/field-input";
import { FieldSelect } from "@/components/ui/field-select";
import { categories } from "@/utils/category";
import { FieldTextArea } from "@/components/ui/field-text-area";
import { useAuth } from "@/hooks/useAuth";
import { DialogProductForm } from "./DialogProductForm";
import { Product } from "@/types/products";
import { useAdminGetAllProducts } from "@/api/products/useAdminGetAllProducts";

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
