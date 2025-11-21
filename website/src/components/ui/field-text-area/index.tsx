import { forwardRef } from "react";
import { FormFieldWrapper, FormFieldWrapperProps } from "../form-field-wrapper";
import { useFormField } from "../formux/useFormField";
import { cn } from "@/utils/general";
import { Textarea } from "../textarea";

export interface FieldTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    FormFieldWrapperProps {
  textAreaClassName?: string;
}

export const FieldTextArea = forwardRef<
  HTMLTextAreaElement,
  FieldTextAreaProps
>((props, ref) => {
  const { className, label, textAreaClassName, description, ...omittedProps } =
    props;

  const { field, error } = useFormField(props);

  return (
    <FormFieldWrapper
      label={label}
      error={error}
      className={className}
      description={description}
    >
      <Textarea
        ref={ref}
        className={cn(
          {
            "ring-1 rounded-md ring-red-500 focus:ring-red-500": !!error,
          },
          textAreaClassName
        )}
        {...omittedProps}
        {...field}
      />
    </FormFieldWrapper>
  );
});
