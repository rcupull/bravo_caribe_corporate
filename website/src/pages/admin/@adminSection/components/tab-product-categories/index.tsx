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
import { useGetAllProductCategories } from "@/api/product-categories/useGetAllProductCategories";
import { useAddUpdateProductCategoryModal } from "@/hooks/useAddUpdateProductCategoryModal";

export const TabProductsCategories = () => {
  const { getAllProductCategories } = useGetAllProductCategories();
  const { addUpdateProductCategoryModal } = useAddUpdateProductCategoryModal();

  const onRefresh = () => getAllProductCategories.fetch();

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-foreground">Categorías</h2>

        <div className="flex gap-2">
          <Button
            className="gap-2"
            onClick={() => {
              addUpdateProductCategoryModal.open({ onRefresh });
            }}
          >
            <Plus className="h-4 w-4" />
            Nueva Categoría
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
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Campos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getAllProductCategories.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay categorias registradas
                </TableCell>
              </TableRow>
            ) : (
              getAllProductCategories.data?.map((rowData, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{rowData.name}</TableCell>
                    <TableCell className="max-w-md">
                      {rowData.description}
                    </TableCell>
                    <TableCell>
                      {rowData.productFields.map(({ label }, index) => {
                        return (
                          <div key={index} className="mx-2 text-nowrap">
                            {`${index + 1} - ${label}`}
                          </div>
                        );
                      })}
                    </TableCell>
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
