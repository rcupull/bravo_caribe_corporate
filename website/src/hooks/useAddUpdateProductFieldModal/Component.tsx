import { Button } from "@/components/ui/button";

import { Formux } from "@/components/ui/formux";
import { FieldInput } from "@/components/ui/field-input";
import { FieldSelect } from "@/components/ui/field-select";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { ProductField, ProductFieldType } from "@/types/product-field";
import { useAddOneProductField } from "@/api/product-fields/useAddOneProductField";
import { useUpdateOneProductField } from "@/api/product-fields/useUpdateOneProductField";
import { FieldTextArea } from "@/components/ui/field-text-area";

interface ComponentProps {
  productField?: ProductField;
  onRefresh: () => void;
}

interface State extends Pick<
  ProductField,
  "type" | "field" | "label" | "description"
> {}

const Component = ({ productField, onRefresh }: ComponentProps) => {
  const { addOneProductField } = useAddOneProductField();
  const { updateOneProductField } = useUpdateOneProductField();

  const { onClose } = useModal();

  return (
    <Formux<State>
      value={{
        label: "",
        field: "",
        type: ProductFieldType.string,
        ...(productField || {}),
      }}
    >
      {({ value }) => {
        return (
          <form className="space-y-4">
            <FieldInput label="Label" name="label" />

            <FieldTextArea label="Descripción" name="description" />

            {!productField && (
              <>
                <FieldInput label="Texto del Campo" name="field" />

                <FieldSelect<{ value: ProductFieldType; label: string }>
                  name="type"
                  label="Tipo de dato"
                  items={[
                    {
                      value: ProductFieldType.string,
                      label: "Texto",
                    },
                    {
                      value: ProductFieldType.longString,
                      label: "Texto largo",
                    },
                  ]}
                  renderOption={({ value }) => value}
                  renderValue={({ value }) => value}
                  optionToValue={({ value }) => value}
                />
              </>
            )}

            <div className="flex gap-2 justify-end">
              <ButtonClose>Cancelar</ButtonClose>
              <Button
                type="button"
                onClick={async () => {
                  const { field, label, type, description } = value;

                  if (productField) {
                    updateOneProductField.fetch(
                      {
                        productFieldSlug: productField.productFieldSlug,
                        update: { label, description },
                      },
                      {
                        onAfterSuccess: () => {
                          onRefresh();
                          onClose();
                        },
                      },
                    );
                  } else {
                    addOneProductField.fetch(
                      {
                        field,
                        label,
                        type,
                        description,
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
                {productField ? "Actualizar" : "Crear"} campo
              </Button>
            </div>
          </form>
        );
      }}
    </Formux>
  );
};

export default Component;
