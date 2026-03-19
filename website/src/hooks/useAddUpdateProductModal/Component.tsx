import { Button } from "@/components/ui/button";

import { Formux } from "@/components/ui/formux";
import { FieldInput } from "@/components/ui/field-input";
import { FieldSelect } from "@/components/ui/field-select";
import { FieldTextArea } from "@/components/ui/field-text-area";
import { Product } from "@/types/products";
import { useAdminAddOneProduct } from "@/api/products/useAdminAddOneProduct";
import { Currency, Image, ImageFile } from "@/types/general";
import { useAdminUpdateOneProduct } from "@/api/products/useAdminUpdateOneProduct";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { FieldInputImages } from "@/components/ui/field-input-images";
import { useAdminAddProductImage } from "@/api/files/useAdminAddProductImage";
import { Fragment } from "react/jsx-runtime";
import { FieldCheckbox } from "@/components/ui/field-checkbox";
import { FieldRadioGroup } from "@/components/ui/field-radio-group";
import { ProductCategory } from "@/types/product-category";
import { useGetAllProductCategories } from "@/api/product-categories/useGetAllProductCategories";
import { useEffect, useState } from "react";
import { ProductField, ProductFieldType } from "@/types/product-field";
import { Divider } from "@/components/divider";

interface ComponentProps {
  product?: Product;
  onRefresh: () => void;
}

interface State extends Pick<
  Product,
  | "currency"
  | "name"
  | "price"
  | "stockAmount"
  | "productCategoryIds"
  | "productFieldsData"
  | "featured"
  | "hidden"
  | "images"
> {}

const Component = ({ product, onRefresh }: ComponentProps) => {
  const { adminAddOneProduct } = useAdminAddOneProduct();
  const { adminUpdateOneProduct } = useAdminUpdateOneProduct();
  const { adminAddProductImage } = useAdminAddProductImage();
  const { getAllProductCategories } = useGetAllProductCategories();

  const [allProductFields, setAllProductFields] = useState<Array<ProductField>>(
    [],
  );

  const getAllProductFieldFromCategories = (
    allCategories: Array<ProductCategory>,
    categoryIds: Array<string>,
  ) => {
    return allCategories
      .filter((pc) => categoryIds.includes(pc._id))
      .map(({ productFields }) => productFields)
      .flat()
      .reduce<Array<ProductField>>((acc, field) => {
        const exists = acc.some(({ _id }) => _id === field._id);
        return exists ? acc : [...acc, field];
      }, []);
  };

  useEffect(() => {
    getAllProductCategories.fetch(
      { pagination: false },
      {
        onAfterSuccess: ({ data }) => {
          if (product?.productCategoryIds?.length) {
            setAllProductFields(
              getAllProductFieldFromCategories(
                data,
                product.productCategoryIds,
              ),
            );
          }
        },
      },
    );
  }, []);

  const allCategories = getAllProductCategories.data || [];

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
        },
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
        stockAmount: 0,
        productCategoryIds: [],
        images: [],
        productFieldsData: {},
        featured: false,
        hidden: false,
        ...(product || {}),
      }}
    >
      {({ value }) => {
        return (
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldInput label="Nombre del Producto" name="name" />

              <FieldInput type="number" label="En stock" name="stockAmount" />

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

              <FieldCheckbox label="Destacado" name="featured" />

              <FieldCheckbox label="Oculto" name="hidden" />
            </div>

            <Divider />

            <FieldRadioGroup<ProductCategory>
              name="productCategoryIds"
              multi
              renderOption={({ checked, item }) => {
                return (
                  <FieldCheckbox
                    noUseFormik
                    value={checked}
                    label={item.name}
                  />
                );
              }}
              optionToValue={({ _id }) => _id}
              items={allCategories}
              containerClassName="flex items-center gap-4"
              onChange={(value: State["productCategoryIds"]) => {
                if (value?.length) {
                  setAllProductFields(
                    getAllProductFieldFromCategories(allCategories, value),
                  );
                }
              }}
            />

            {!!allProductFields.length && (
              <div className="bg-gray-200 rounded-md px-2 py-3">
                <p className="mb-2">Detalles de las categorías</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                  {allProductFields.map(({ label, field, type }, index) => {
                    const element = (() => {
                      if (type === ProductFieldType.string) {
                        return (
                          <FieldInput
                            label={label}
                            name={`productFieldsData.${field}`}
                          />
                        );
                      }

                      if (type === ProductFieldType.longString) {
                        return (
                          <FieldTextArea
                            label={label}
                            name={`productFieldsData.${field}`}
                            rows={10}
                            className="col-span-1 sm:col-span-2"
                          />
                        );
                      }

                      return null;
                    })();

                    return <Fragment key={index}>{element}</Fragment>;
                  })}
                </div>
              </div>
            )}

            <Divider />

            <FieldInputImages multi label="Imagen" name="images" />

            <div className="flex gap-2 justify-end">
              <ButtonClose>Cancelar</ButtonClose>
              <Button
                type="button"
                isLoading={
                  adminUpdateOneProduct.isPending ||
                  adminAddOneProduct.isPending
                }
                onClick={async () => {
                  const {
                    currency,
                    name,
                    price,
                    images,
                    stockAmount,
                    productCategoryIds,
                    productFieldsData,
                    featured,
                    hidden,
                  } = value;

                  const promises = images?.map((image) => uploadImage(image));
                  const imagesToUpload = promises
                    ? await Promise.all(promises)
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
                          images: imagesToUpload,
                          stockAmount,
                          productCategoryIds,
                          productFieldsData,
                          hidden,
                        },
                      },
                      {
                        onAfterSuccess: () => {
                          onRefresh();
                          onClose();
                        },
                      },
                    );
                  } else {
                    adminAddOneProduct.fetch(
                      {
                        currency,
                        name,
                        price,
                        featured,
                        images: imagesToUpload,
                        stockAmount,
                        productCategoryIds,
                        productFieldsData,
                        hidden,
                      },
                      {
                        onAfterSuccess: () => {
                          onRefresh();
                          onClose();
                        },
                      },
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
