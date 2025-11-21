import { forwardRef } from "react";

import { SelectContainer } from "../SelectContainer";
import { FormFieldWrapperProps } from "@/components/ui/form-field-wrapper";
import { FormField } from "@/components/ui/formux/useFormField";
import { cn } from "@/utils/general";
import { ImagePlus } from "lucide-react";

export interface FileSystemSelectProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">,
    FormFieldWrapperProps {
  onChange: (file: File | undefined) => void;
  field: FormField;
}

export const FileSystemSelect = forwardRef<
  HTMLInputElement,
  FileSystemSelectProps
>((props, ref) => {
  const { onChange, field, ...omittedProps } = props;

  return (
    <SelectContainer svg={ImagePlus} onClick={() => {}}>
      <label
        htmlFor={field.name}
        className={cn(
          "relative cursor-pointer rounded-md bg-white font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
        )}
      >
        <span>Seleccione imagen en su galería</span>
        <input
          ref={ref}
          type="file"
          className="sr-only"
          accept="image/*"
          {...omittedProps}
          {...field}
          id={field.name}
          value=""
          onChange={(event) => {
            onChange?.(event.target.files?.[0]);
          }}
        />
      </label>
    </SelectContainer>
  );
});
