import { forwardRef, useEffect, useRef } from "react";
import { FormFieldWrapper, FormFieldWrapperProps } from "../form-field-wrapper";
import { Nullable } from "@/types/general";
import { Input, InputProps } from "../input";
import { useFormField } from "../formux/useFormField";
import { cn, isNullOrUndefined, mergeRefs } from "@/utils/general";

export interface FieldInputProps extends InputProps, FormFieldWrapperProps {
  error?: Nullable<string>;
  autoFocusDelay?: number;
  processing?: {
    pre: (value: any) => any;
    post: (value: any) => any;
  };
}

export const FieldInput = forwardRef<HTMLInputElement, FieldInputProps>(
  (props, ref) => {
    const {
      className,
      label,
      description,
      error: errorProp,
      autoFocus,
      autoFocusDelay = 0,
      processing,
      ...omittedProps
    } = props;

    const refInternal = useRef<HTMLInputElement>(null);
    const { field, error } = useFormField(props);

    useEffect(() => {
      if (autoFocus) {
        setTimeout(() => refInternal.current?.focus(), autoFocusDelay);
      }
    }, []);

    return (
      <FormFieldWrapper
        label={label}
        error={errorProp ?? error}
        description={description}
        className={className}
      >
        <Input
          ref={mergeRefs([refInternal, ref])}
          className={cn({
            "ring-1 rounded-3xl ring-red-500 focus:ring-red-500": !!error,
          })}
          {...omittedProps}
          {...field}
          value={(() => {
            let value = isNullOrUndefined(field.value) ? "" : field.value;

            if (processing) {
              value = processing.pre(value);
            }

            return value;
          })()}
          onChange={(() => (event) => {
            let value = event.target.value;

            if (processing) {
              value = processing.post(value);
            }

            field.onChange({
              target: {
                name: field.name,
                value,
              },
            });
          })()}
        />
      </FormFieldWrapper>
    );
  }
);
