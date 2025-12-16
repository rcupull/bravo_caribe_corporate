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

import { FileImage, RefreshCcw } from "lucide-react";

import { useAdminGetAllShopping } from "@/api/shoppings/useAdminGetAllShopping";
import { ImageComponent } from "@/components/image-component";
import { getShoppingTotalPrice } from "@/utils/shopping";
import { cn } from "@/utils/general";
import { ShoppingState } from "@/types/shopping";

export const TabShoppings = () => {
  const { adminGetAllShopping } = useAdminGetAllShopping();

  const onRefresh = () => adminGetAllShopping.fetch({});

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Órdenes
        </h2>

        <Button variant="outline" className="gap-2" onClick={onRefresh}>
          <RefreshCcw className="h-4 w-4" />
          Actualizar
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Orden</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {adminGetAllShopping.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay órdenes registradas
                </TableCell>
              </TableRow>
            ) : (
              adminGetAllShopping.data?.map((shopping) => {
                const { _id, code, createdAt, products, state } = shopping;

                const total = getShoppingTotalPrice(shopping);

                return (
                  <TableRow key={_id}>
                    {/* Código de orden */}
                    <TableCell className="font-medium">#{code}</TableCell>

                    {/* Productos */}
                    <TableCell>
                      <div className="space-y-3">
                        {products.map(({ count, productData }) => {
                          const { name, price, images } = productData;
                          const image = images?.[0];

                          return (
                            <div
                              key={productData._id}
                              className="flex items-center gap-3"
                            >
                              {image ? (
                                <ImageComponent
                                  image={image}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              ) : (
                                <FileImage className="w-12 h-12 text-muted-foreground" />
                              )}

                              <div className="flex-1">
                                <div className="text-sm font-medium">
                                  {name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {count} × ${price.toFixed(2)}
                                </div>
                              </div>

                              <div className="text-sm font-semibold">
                                ${(price * count).toFixed(2)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </TableCell>

                    {/* Total orden */}
                    <TableCell className="font-bold text-accent">
                      ${total.toFixed(2)}
                    </TableCell>

                    {/* Estado */}
                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          {
                            "bg-green-100 text-green-800":
                              state === ShoppingState.APPROVED,
                            "bg-yellow-100 text-yellow-800":
                              state === ShoppingState.REQUESTED,
                            "bg-red-100 text-red-800":
                              state === ShoppingState.CANCELED ||
                              state === ShoppingState.REJECTED,
                          }
                        )}
                      >
                        {state}
                      </span>
                    </TableCell>

                    {/* Fecha */}
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(createdAt).toLocaleDateString()}
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
