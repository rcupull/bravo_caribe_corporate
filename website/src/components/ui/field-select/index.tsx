import { AnyRecord, StyleProps } from "@/types/general";
import { Fragment, useEffect, useState } from "react";
import { FormFieldWrapper, FormFieldWrapperProps } from "../form-field-wrapper";
import { useFormField } from "../formux/useFormField";
import { Check, ChevronDown } from "lucide-react";
import {
  cn,
  getFlattenArray,
  isArray,
  isEqualObj,
  removeRow,
} from "@/utils/general";
import { Dropdown } from "../dropdown";

export interface FieldSelectProps<
  Option extends AnyRecord = AnyRecord,
  Value = any
> extends StyleProps,
    FormFieldWrapperProps {
  onChange?: (val: Value) => void;
  value?: Value;
  items: Array<Option>;
  optionToValue?: (option: Option) => Value;
  renderOption: (option: Option) => React.ReactNode;
  renderValue: (option: Option) => React.ReactNode;
  placeholder?: string;
  name: string;
  multi?: boolean;
  disabled?: boolean;
}

export const FieldSelect = <Option extends AnyRecord = AnyRecord>(
  props: FieldSelectProps<Option>
) => {
  const {
    items,
    renderOption,
    renderValue,
    label,
    className,
    optionToValue,
    placeholder,
    multi,
    disabled,
    description,
    onChange,
  } = props;

  const [state, setState] = useState<Option | Array<Option>>();

  const { field, error } = useFormField(props);
  const { value = multi ? [] : null } = field;

  useEffect(() => {
    let newState = value;

    if (optionToValue) {
      if (isArray(value)) {
        newState = value.map((v) =>
          items.find((item) => optionToValue(item) === v)
        );
      } else {
        newState = items.find((item) => optionToValue(item) === value);
      }
    }

    setState(newState);
  }, [JSON.stringify([value])]);

  const handleChange = (newSelectedOptionT: any) => {
    if (isArray(newSelectedOptionT)) {
      const newSelectedOption = getFlattenArray(newSelectedOptionT);
      setState(newSelectedOption);

      const value = optionToValue
        ? newSelectedOption.map(optionToValue)
        : newSelectedOption;

      onChange?.(value);

      field.onChange({
        target: {
          name: field.name,
          value,
        },
      });
    } else {
      const newSelectedOption = newSelectedOptionT;
      setState(newSelectedOption);

      const value = optionToValue
        ? optionToValue(newSelectedOption)
        : newSelectedOption;

      onChange?.(value);

      field.onChange({
        target: {
          name: field.name,
          value,
        },
      });
    }
  };

  return (
    <FormFieldWrapper
      label={label}
      error={error}
      className={className}
      description={description}
    >
      <Dropdown
        /**
         * keep opened when click on item
         */
        disabled={disabled}
        contentFullWidth
        content={({ onClose }) => (
          <div className="overflow-y-auto max-h-[20rem] bg-white rounded-md">
            {items.map((item, index) => {
              const selected = isArray(state)
                ? state.find((s) => isEqualObj(s, item))
                : isEqualObj(state, item);

              return (
                <div
                  key={index}
                  className={cn(
                    "text-gray-900 relative select-none cursor-pointer pl-2 pr-4 py-2 my-1 rounded-sm",
                    {
                      ["bg-gray-200"]: selected,
                    }
                  )}
                  onClick={() => {
                    if (isArray(state)) {
                      handleChange(
                        selected
                          ? removeRow(
                              state,
                              state.findIndex((i) => isEqualObj(i, item))
                            )
                          : [...state, item]
                      );
                    } else {
                      if (!selected) {
                        handleChange(selected ? undefined : item);
                        onClose();
                      }
                    }
                  }}
                >
                  <div className="flex items-center ml-2 truncate">
                    {renderOption(item)}

                    <Check
                      className={cn("ml-auto", {
                        "text-primary": selected,
                        "text-transparent": !selected,
                      })}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        className="w-full"
      >
        <div
          className={cn(
            "relative rounded-md py-3 pl-3 pr-10 text-left text-gray-900 ring-1 ring-gray-200",
            {
              "bg-white": !disabled,
              "bg-gray-200": disabled,
            }
          )}
        >
          {placeholder && !state && (
            <span className="text-gray-400 absolute inset-y-0 left-0 flex items-center pl-4">
              {placeholder}
            </span>
          )}
          <div className="flex gap-1 items-center h-6">
            {state &&
              (isArray(state)
                ? state.map((option, index) => (
                    <Fragment key={index}>{renderValue(option)}</Fragment>
                  ))
                : renderValue(state))}
          </div>

          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronDown className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Dropdown>
    </FormFieldWrapper>
  );
};
