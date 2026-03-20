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

import { FileImage, Plus, RefreshCcw } from "lucide-react";

import { useAdminGetAllProducts } from "@/api/products/useAdminGetAllProducts";
import { RowActions } from "./RowActions";
import { useAddUpdateProductModal } from "@/hooks/useAddUpdateProductModal";
import { ImageComponent } from "@/components/image-component";
import { useRouter } from "@/hooks/useRouter";
import { Filters } from "./Filters";
import { PaginatorComponent } from "@/components/paginator-component";

export const TabProducts = () => {
  const { adminGetAllProducts } = useAdminGetAllProducts();
  const { addUpdateProductModal } = useAddUpdateProductModal();
  const { query, onChangeQuery } = useRouter();

  const search = query.search as string | undefined;
  const categorySlugs = query.categorySlugs as Array<string> | undefined;
  const page = query.page as number | undefined;

  const onRefresh = () => {
    adminGetAllProducts.fetch({ categorySlugs, search, page });
  };

  useEffect(() => {
    onRefresh();
  }, [categorySlugs?.length, search, page]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Productos
        </h2>

        <div className="flex gap-2">
          <Button
            className="gap-2"
            onClick={() => {
              addUpdateProductModal.open({ onRefresh });
            }}
          >
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>

          <Button variant="outline" className="gap-2" onClick={onRefresh}>
            <RefreshCcw className="h-4 w-4" />
            Actualizar
          </Button>
        </div>
      </div>

      <Filters />

      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categorias</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminGetAllProducts.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay productos registrados
                </TableCell>
              </TableRow>
            ) : (
              adminGetAllProducts.data?.map((rowData) => {
                const image =
                  rowData.images && rowData.images.length > 0
                    ? rowData.images[0]
                    : null;

                const inStock = !!rowData.stockAmount;
                return (
                  <TableRow key={rowData._id}>
                    <TableCell>
                      {image ? (
                        <ImageComponent
                          image={image}
                          className="w-24 object-cover rounded"
                        />
                      ) : (
                        <FileImage className="w-16 h-16 text-gray-300 object-cover rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {rowData.name}
                      {rowData.featured && (
                        <span className="px-2 py-1 ml-6 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Destacado
                        </span>
                      )}
                      {rowData.hidden && (
                        <span className="px-2 py-1 ml-6 rounded-full text-xs font-medium bg-stone-100 text-stone-800">
                          Oculto
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {rowData.productCategories?.map(({ name }, index) => {
                        return (
                          <p
                            key={index}
                            className="px-2 py-1 my-2 rounded-full text-md font-medium bg-blue-100 text-blue-800 text-center"
                          >
                            {name}
                          </p>
                        );
                      })}
                    </TableCell>
                    <TableCell>${rowData.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {inStock
                          ? `${rowData.stockAmount} en stock`
                          : "Agotado"}
                      </span>
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

        <PaginatorComponent
          paginator={adminGetAllProducts.paginator}
          onChangePage={(page) => onChangeQuery({ page })}
        />
      </div>
    </>
  );
};
