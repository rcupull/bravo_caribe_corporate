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
import { CategorySpecsType, CategoryType } from "@/types/category";
import { useAdminAddProductImage } from "@/api/files/useAdminAddProductImage";
import { Fragment } from "react/jsx-runtime";
import { FieldCheckbox } from "@/components/ui/field-checkbox";

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
    | "inStock"
    | "specs"
    | "featured"
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
        price: 0,
        inStock: true,
        categoryType: CategoryType.TIRE,
        image: product?.images?.[0],
        specs: {},
        featured: false,
        ...(product || {}),
      }}
    >
      {({ value }) => {
        const currentCategory = categories.find(
          ({ type }) => value.categoryType === type
        );

        return (
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput label="Nombre del Producto" name="name" />

              <div className="mt-6 flex items-center justify-around gap-4">
                <FieldCheckbox label="En Stock" name="inStock" />

                <FieldCheckbox label="Destacado" name="featured" />
              </div>

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
              <div className="bg-gray-200 rounded-md px-2 py-3">
                <p className="mb-2">Detalles de las categorías</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                  {currentCategory?.specsFields.map(
                    ({ field, label, type }, index) => {
                      const element = (() => {
                        if (type === CategorySpecsType.string) {
                          return (
                            <FieldInput label={label} name={`specs.${field}`} />
                          );
                        }

                        if (type === CategorySpecsType.longString) {
                          return (
                            <FieldTextArea
                              label={label}
                              name={`specs.${field}`}
                              rows={10}
                              className="col-span-1 sm:col-span-2"
                            />
                          );
                        }

                        if (type === CategorySpecsType.number) {
                          return (
                            <FieldInput
                              type="number"
                              label={label}
                              name={`specs.${field}`}
                            />
                          );
                        }

                        return null;
                      })();

                      return <Fragment key={index}>{element}</Fragment>;
                    }
                  )}
                </div>
              </div>
            )}

            <FieldInputImages label="Imagen" name="image" />

            <div className="flex gap-2 justify-end">
              <ButtonClose>Cancelar</ButtonClose>
              <Button
                type="button"
                onClick={async () => {
                  const {
                    currency,
                    name,
                    price,
                    image,
                    inStock,
                    categoryType,
                    specs,
                    featured,
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
                          featured,
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
                        featured,
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
