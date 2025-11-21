import { Button } from "@/components/ui/button";

import { Formux } from "@/components/ui/formux";
import { FieldInput } from "@/components/ui/field-input";
import { FieldSelect } from "@/components/ui/field-select";
import { categories } from "@/utils/category";
import { FieldTextArea } from "@/components/ui/field-text-area";
import { Product } from "@/types/products";
import { useAdminAddOneProduct } from "@/api/products/useAdminAddOneProduct";
import { Currency, Image, ImageFile } from "@/types/general";
import { useAdminUpdateOneProduct } from "@/api/products/useAdminUpdateOneProduct";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { FieldInputImages } from "@/components/ui/field-input-images";
import { CategoryType } from "@/types/category";
import { useAdminAddProductImage } from "@/api/files/useAdminAddProductImage";

interface ComponentProps {
  product?: Product;
  onRefresh: () => void;
}

interface State
  extends Pick<
    Product,
    | "categoryType"
    | "currency"
    | "name"
    | "price"
    | "description"
    | "details"
    | "inStock"
    | "specs"
  > {
  image?: Image;
}

const Component = ({ product, onRefresh }: ComponentProps) => {
  const { adminAddOneProduct } = useAdminAddOneProduct();
  const { adminUpdateOneProduct } = useAdminUpdateOneProduct();
  const { adminAddProductImage } = useAdminAddProductImage();

  const uploadImage = async (image: Image | ImageFile): Promise<Image> => {
    return new Promise((resolve, rejected) => {
      adminAddProductImage.fetch(
        {
          image,
        },
        {
          onAfterSuccess: (data) => {
            resolve(data);
          },
          onAfterFailed: () => {
            rejected();
          },
        }
      );
    });
  };

  const { onClose } = useModal();

  return (
    <Formux<State>
      value={{
        name: "",
        currency: Currency.USD,
        description: "",
        price: 0,
        inStock: true,
        categoryType: CategoryType.TIRE,
        details: "",
        image: product?.images?.[0],
        specs: {},
        ...(product || {}),
      }}
    >
      {({ value }) => {
        const currentCategory = categories.find(
          ({ type }) => value.categoryType === type
        );

        return (
          <form className="space-y-4">
            <FieldInput label="Nombre del Producto" name="name" />

            <FieldTextArea label="Descripción" name="description" />

            <div className="grid grid-cols-3 gap-4">
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

              <FieldSelect<{ value: boolean; label: string }>
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
              />
            </div>

            <FieldSelect
              items={categories}
              label="Categoría"
              renderOption={({ name }) => name}
              renderValue={({ name }) => name}
              optionToValue={({ type }) => type}
              name="categoryType"
            />

            {currentCategory?.specsFields.length && (
              <div className="bg-gray-100 rounded-md px-2 py-3">
                <p className="mb-2">Detalles de las categorías</p>

                <div className="grid grid-cols-2 gap-4 ">
                  {currentCategory?.specsFields.map(
                    ({ field, label }, index) => {
                      return (
                        <FieldInput
                          key={index}
                          label={label}
                          name={`specs.${field}`}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            )}

            <FieldInputImages label="Imágen" name="image" />

            <div className="flex gap-2 justify-end">
              <ButtonClose>Cancelar</ButtonClose>
              <Button
                type="button"
                onClick={async () => {
                  const {
                    currency,
                    name,
                    price,
                    description,
                    details,
                    image,
                    inStock,
                    categoryType,
                    specs,
                  } = value;

                  const imageToUpload = image
                    ? await uploadImage(image)
                    : undefined;

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
                          images: imageToUpload ? [imageToUpload] : [],
                          inStock,
                          categoryType,
                          specs,
                        },
                      },
                      {
                        onAfterSuccess: () => {
                          onRefresh();
                          onClose();
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
                        images: imageToUpload ? [imageToUpload] : [],
                        inStock,
                        categoryType,
                        specs,
                      },
                      {
                        onAfterSuccess: () => {
                          onRefresh();
                          onClose();
                        },
                      }
                    );
                  }
                }}
              >
                {product ? "Actualizar" : "Crear"} Producto
              </Button>
            </div>
          </form>
        );
      }}
    </Formux>
  );
};

export default Component;
