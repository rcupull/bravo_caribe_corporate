import { Button } from "@/components/ui/button";

import { Formux } from "@/components/ui/formux";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { useAddOneProductCategory } from "@/api/product-categories/useAddOneProductCategory";
import { useUpdateOneProductCategory } from "@/api/product-categories/useUpdateOneProductCategory";
import { ProductCategory } from "@/types/product-category";
import { FieldInput } from "@/components/ui/field-input";
import { FieldTextArea } from "@/components/ui/field-text-area";
import { useGetAllProductFields } from "@/api/product-fields/useGetAllProductFields";
import { useEffect } from "react";
import { FieldCheckbox } from "@/components/ui/field-checkbox";
import { FieldRadioGroup } from "@/components/ui/field-radio-group";
import { ProductField } from "@/types/product-field";
import { FieldSelect } from "@/components/ui/field-select";
import {
  CategoryIcon,
  categoryIconsAvaliables,
} from "@/components/category-icon";

interface ComponentProps {
  productCategory?: ProductCategory;
  onRefresh: () => void;
}

interface State extends Pick<
  ProductCategory,
  "description" | "name" | "productFieldIds" | "iconSvg"
> {}

const Component = ({ productCategory, onRefresh }: ComponentProps) => {
  const { addOneProductCategory } = useAddOneProductCategory();
  const { updateOneProductCategory } = useUpdateOneProductCategory();
  const { getAllProductFields } = useGetAllProductFields();

  useEffect(() => {
    getAllProductFields.fetch({ pagination: false });
  }, []);

  const { onClose } = useModal();

  return (
    <Formux<State>
      value={{
        name: "",
        description: "",
        iconSvg: undefined,
        productFieldIds: [],
        ...(productCategory || {}),
      }}
    >
      {({ value }) => {
        return (
          <form className="space-y-4">
            <FieldInput label="Nombre" name="name" />

            <FieldTextArea label="Descripción" name="description" />

            <FieldSelect<{ iconName: string }>
              name="iconSvg"
              label="Icono"
              items={Object.keys(categoryIconsAvaliables).map((iconName) => ({
                iconName,
              }))}
              renderOption={({ iconName }) => (
                <div className="flex gap-2">
                  <CategoryIcon iconName={iconName} />
                  {iconName}
                </div>
              )}
              renderValue={({ iconName }) => (
                <div className="flex gap-2">
                  <CategoryIcon iconName={iconName} />
                  {iconName}
                </div>
              )}
              optionToValue={({ iconName }) => iconName}
            />

            <FieldRadioGroup<ProductField>
              label="Campos del producto"
              name="productFieldIds"
              multi
              renderOption={({ checked, item }) => {
                return (
                  <FieldCheckbox
                    noUseFormik
                    value={checked}
                    label={item.label}
                  />
                );
              }}
              optionToValue={({ _id }) => _id}
              items={getAllProductFields.data || []}
              containerClassName="grid grid-cols-2 gap-4"
            />

            <div className="flex gap-2 justify-end">
              <ButtonClose>Cancelar</ButtonClose>
              <Button
                type="button"
                onClick={async () => {
                  const { description, name, productFieldIds, iconSvg } = value;

                  if (productCategory) {
                    const { productCategorySlug } = productCategory;

                    updateOneProductCategory.fetch(
                      {
                        productCategorySlug,
                        update: { description, name, productFieldIds, iconSvg },
                      },
                      {
                        onAfterSuccess: () => {
                          onRefresh();
                          onClose();
                        },
                      },
                    );
                  } else {
                    addOneProductCategory.fetch(
                      {
                        description,
                        name,
                        productFieldIds,
                        iconSvg,
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
                {productCategory ? "Actualizar" : "Crear"} categoría
              </Button>
            </div>
          </form>
        );
      }}
    </Formux>
  );
};

export default Component;
