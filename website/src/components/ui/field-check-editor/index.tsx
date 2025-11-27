import type { CheckEditorProps } from "../check-editor";

import { dynamic } from "@/utils/makeLazy";
import { StyleProps } from "@/types/general";
import { useFormField } from "../formux/useFormField";
import { FormFieldWrapper, FormFieldWrapperProps } from "../form-field-wrapper";

const CheckEditor = dynamic(() => import("../check-editor"));

export interface FieldCheckEditorProps
  extends StyleProps,
    FormFieldWrapperProps {
  onChange?: (value: string) => void;
  name?: string;
  checkEditorProps?: Partial<CheckEditorProps>;
}

export const FieldCheckEditor = (props: FieldCheckEditorProps) => {
  const {
    label,
    className,
    description,
    onChange,
    checkEditorProps = {},
  } = props;

  const { field, error } = useFormField(props);
  const { value } = field;

  return (
    <FormFieldWrapper
      label={label}
      error={error}
      className={className}
      description={description}
    >
      <CheckEditor
        value={value}
        onBlur={() => {
          field.onClick();
        }}
        onChange={({ data }) => {
          onChange?.(data);

          field.onChange({
            target: {
              name: field.name,
              value: data,
            },
          });
        }}
        {...checkEditorProps}
      />
    </FormFieldWrapper>
  );
};
