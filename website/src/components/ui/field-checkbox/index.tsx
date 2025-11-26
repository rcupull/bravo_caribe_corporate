import { forwardRef } from "react";

import { cn } from "@/utils/general";
import { FormFieldWrapper, FormFieldWrapperProps } from "../form-field-wrapper";
import { FormikWrapper } from "../formik-wrapper";

export interface FieldCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value">,
    FormFieldWrapperProps {
  noUseFormik?: boolean;
  value?: boolean;
  radioVariant?: boolean;
}
//

export const FieldCheckbox = forwardRef<HTMLInputElement, FieldCheckboxProps>(
  (allProps, ref) => {
    const { noUseFormik, ...props } = allProps;

    if (noUseFormik) {
      const {
        className,
        label,
        value,
        onChange,
        description,
        radioVariant,
        disabled,
        ...omittedProps
      } = props;

      return (
        <FormFieldWrapper
          label={label}
          description={description}
          className={cn("w-fit relative", className)}
          labelPosition="right"
        >
          <input
            ref={ref}
            type={radioVariant ? "radio" : "checkbox"}
            disabled={disabled}
            checked={!!value}
            onChange={(e) => onChange?.(e)}
            className={cn(
              "block w-5 h-5 checked:bg-primary checked:ring-primary",
              {
                "rounded-sm": !radioVariant,
                "rounded-full": radioVariant,
                "!bg-gray-300 !ring-gray-300 cursor-not-allowed": disabled,
              }
            )}
            {...omittedProps}
          />
        </FormFieldWrapper>
      );
    }

    return (
      <FormikWrapper {...props}>
        {({ error, field }) => {
          const {
            className,
            label,
            description,
            radioVariant,
            disabled,
            ...omittedProps
          } = props;
          const { value, onChange } = field;

          return (
            <FormFieldWrapper
              label={label}
              description={description}
              error={error}
              className={cn("w-fit", className)}
              labelPosition="right"
            >
              <input
                ref={ref}
                disabled={disabled}
                type={radioVariant ? "radio" : "checkbox"}
                className={cn(
                  "block w-5 h-5 checked:bg-primary checked:ring-primary",
                  {
                    "rounded-sm": !radioVariant,
                    "rounded-full": radioVariant,
                    "!bg-gray-300 !ring-gray-300 cursor-not-allowed": disabled,
                  }
                )}
                {...omittedProps}
                {...field}
                checked={value}
                onChange={(e) => {
                  onChange({
                    target: {
                      name: field.name,
                      value: e.target.checked,
                    },
                  });
                }}
                onClick={() => {
                  field.onClick?.();
                }}
              />
            </FormFieldWrapper>
          );
        }}
      </FormikWrapper>
    );
  }
);
