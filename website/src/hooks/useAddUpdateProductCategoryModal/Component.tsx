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

interface ComponentProps {
  productCategory?: ProductCategory;
  onRefresh: () => void;
}

interface State extends Pick<
  ProductCategory,
  "description" | "name" | "productFieldIds"
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
        productFieldIds: [],
        ...(productCategory || {}),
      }}
    >
      {({ value }) => {
        return (
          <form className="space-y-4">
            <FieldInput label="Nombre" name="name" />

            <FieldTextArea label="Descripción" name="description" />

            <FieldRadioGroup<ProductField>
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
              containerClassName="flex items-center flex-wrap gap-4"
            />

            <div className="flex gap-2 justify-end">
              <ButtonClose>Cancelar</ButtonClose>
              <Button
                type="button"
                onClick={async () => {
                  const { description, name, productFieldIds } = value;

                  if (productCategory) {
                    const { productCategorySlug } = productCategory;

                    updateOneProductCategory.fetch(
                      {
                        productCategorySlug,
                        update: { description, name, productFieldIds },
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
