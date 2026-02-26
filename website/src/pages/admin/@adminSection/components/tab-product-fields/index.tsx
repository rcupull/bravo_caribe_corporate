import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Plus, RefreshCcw } from "lucide-react";

import { RowActions } from "./RowActions";
import { useGetAllProductFields } from "@/api/product-fields/useGetAllProductFields";
import { useAddUpdateProductFieldModal } from "@/hooks/useAddUpdateCategoryFieldModal";

export const TabProductsFields = () => {
  const { getAllProductFields } = useGetAllProductFields();
  const { addUpdateProductFieldModal } = useAddUpdateProductFieldModal();

  const onRefresh = () => getAllProductFields.fetch();

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Campos de Producto
        </h2>

        <div className="flex gap-2">
          <Button
            className="gap-2"
            onClick={() => {
              addUpdateProductFieldModal.open({ onRefresh });
            }}
          >
            <Plus className="h-4 w-4" />
            Nuevo Campo
          </Button>

          <Button variant="outline" className="gap-2" onClick={onRefresh}>
            <RefreshCcw className="h-4 w-4" />
            Actualizar
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>field</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getAllProductFields.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay campos de products registrados
                </TableCell>
              </TableRow>
            ) : (
              getAllProductFields.data?.map((rowData, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{rowData.label}</TableCell>
                    <TableCell>{rowData.field}</TableCell>
                    <TableCell>{rowData.type}</TableCell>
                    <TableCell className="text-right">
                      <RowActions rowData={rowData} onRefresh={onRefresh} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
