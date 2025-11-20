import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Formux } from "@/components/ui/formux";
import { FieldInput } from "@/components/ui/field-input";
import { FieldSelect } from "@/components/ui/field-select";
import { categories } from "@/utils/category";
import { FieldTextArea } from "@/components/ui/field-text-area";
import { Product } from "@/types/products";
import { useAdminAddOneProduct } from "@/api/products/useAdminAddOneProduct";
import { Currency } from "@/types/general";
import { useAdminUpdateOneProduct } from "@/api/products/useAdminUpdateOneProduct";

interface DialogProductFormProps {
  product?: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRefresh: () => void;
}

export const DialogProductForm = ({
  product,
  onOpenChange,
  open,
  onRefresh,
}: DialogProductFormProps) => {
  const navigate = useNavigate();

  const editingProduct = !!product;

  const { adminAddOneProduct } = useAdminAddOneProduct();
  const { adminUpdateOneProduct } = useAdminUpdateOneProduct();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
          <DialogDescription>
            {editingProduct
              ? "Modifica los datos del producto"
              : "Completa el formulario para agregar un nuevo producto"}
          </DialogDescription>
        </DialogHeader>

        <Formux<Partial<Product>>
          value={{
            name: "",
            currency: Currency.USD,
            description: "",
            ...(product || {}),
          }}
        >
          {({ value, resetForm }) => {
            return (
              <form className="space-y-4">
                <FieldInput label="Nombre del Producto" name="name" />

                <FieldTextArea label="Descripción" name="description" />

                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="Marca" name="brand" />

                  <FieldSelect
                    items={categories}
                    label="Categoría"
                    renderOption={({ name }) => name}
                    renderValue={({ name }) => name}
                    optionToValue={({ type }) => type}
                    name="category"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FieldInput label="Precio" name="price" type="number" />

                  <FieldSelect<{ value: Currency }>
                    name="currency"
                    label="Moneda"
                    items={[
                      {
                        value: Currency.CUP,
                      },
                      {
                        value: Currency.MLC,
                      },
                      {
                        value: Currency.USD,
                      },
                    ]}
                    renderOption={({ value }) => value}
                    renderValue={({ value }) => value}
                    optionToValue={({ value }) => value}
                  />

                  {/* <FieldSelect<{ value: boolean; label: string }>
                    items={[
                      {
                        label: "En Stock",
                        value: true,
                      },
                      {
                        label: "Agotado",
                        value: false,
                      },
                    ]}
                    label="Disponibilidad"
                    renderOption={({ label }) => label}
                    renderValue={({ label }) => label}
                    optionToValue={({ value }) => value}
                    name="inStock"
                  /> */}
                </div>
                {/* <div className="space-y-2">
                      <Label htmlFor="image">URL de Imagen</Label>
                      <Input
                        id="image"
                        type="url"
                        value={productFormData.image}
                        onChange={(e) =>
                          setProductFormData({
                            ...productFormData,
                            image: e.target.value,
                          })
                        }
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div> */}
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      const {
                        currency,
                        name,
                        price,
                        description,
                        details,
                        images,
                      } = value;

                      if (product) {
                        adminUpdateOneProduct.fetch(
                          {
                            productSlug: product.productSlug,
                            update: {
                              currency,
                              name,
                              price,
                              description,
                              details,
                              images,
                            },
                          },
                          {
                            onAfterSuccess: () => {
                              resetForm();
                              onOpenChange(false);
                              onRefresh();
                            },
                          }
                        );
                      } else {
                        adminAddOneProduct.fetch(
                          {
                            currency,
                            name,
                            price,
                            description,
                            details,
                            images,
                          },
                          {
                            onAfterSuccess: () => {
                              resetForm();
                              onOpenChange(false);
                              onRefresh();
                            },
                          }
                        );
                      }
                    }}
                  >
                    {editingProduct ? "Actualizar" : "Crear"} Producto
                  </Button>
                </div>
              </form>
            );
          }}
        </Formux>
      </DialogContent>
    </Dialog>
  );
};
