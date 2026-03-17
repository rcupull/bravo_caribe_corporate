import { Nullable, StyleProps } from "@/types/general";
import { MultiContainer } from "./MultiContainer";
import { cn, compact, getFlattenJson, isEqual } from "@/utils/general";
import { Spinner } from "@/components/spinner";

export interface RadioGroupProps<O, V = any> extends StyleProps {
  items: Array<Nullable<O>>;
  value?: V;
  onChange?: (newValue: V) => void;
  renderOption: (args: {
    checked: boolean;
    item: O;
    index: number;
  }) => React.ReactNode | null;
  optionToValue: (item: O) => V;
  disabledOption?: (args: { item: O; index: number }) => boolean;
  onBlur?: () => void;
  onOptionClicked?: (item: O, options: { selected: boolean }) => void;
  getOptionCutomStyles?: (item: O, options: { selected: boolean }) => string;
  multi?: boolean;
}

//eslint-disable-next-line
export const RadioGroup = <O extends any = any>({
  className,
  items: itemsProp,
  value,
  onChange,
  onBlur,
  renderOption,
  optionToValue,
  multi,
  disabledOption,
  onOptionClicked,
  getOptionCutomStyles,
}: RadioGroupProps<O>) => {
  const items = compact(itemsProp);

  if (multi) {
    return (
      <MultiContainer items={items} optionToValue={optionToValue} value={value}>
        {({ selected, setSelected }) => {
          return (
            <div className={className}>
              {items.map((item, index) => {
                const checked = !!selected[index];
                const node = renderOption({ checked, item, index });

                if (!node) return null;

                return (
                  <div
                    key={index}
                    onBlur={onBlur}
                    onClick={() => {
                      const newSelected = {
                        ...selected,
                        [index]: checked ? undefined : true,
                      };
                      setSelected(newSelected);

                      const newValue = Object.keys(
                        getFlattenJson(newSelected),
                      ).map((index) => {
                        return optionToValue(items[Number(index)]);
                      });

                      onChange?.(newValue);
                      onOptionClicked?.(item, { selected: !checked });
                    }}
                    className={cn(
                      "relative",
                      getOptionCutomStyles?.(item, { selected: !checked }) ??
                        "",
                    )}
                  >
                    {node}

                    {!!disabledOption?.({ item, index }) && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 bg-white opacity-55 rounded-3xl flex items-center justify-center cursor-not-allowed"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        }}
      </MultiContainer>
    );
  }

  return (
    <div onBlur={onBlur} className={cn("relative", className)}>
      {items.map((item, index) => {
        const itemValue = optionToValue(item);
        const checked = isEqual(itemValue, value);

        return (
          <div
            key={index}
            onClick={() => {
              onChange?.(itemValue);
              onOptionClicked?.(item, { selected: !checked });
            }}
          >
            <div className="relative">
              {renderOption({ checked, item, index })}

              {!!disabledOption?.({ item, index }) && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute inset-0 bg-white opacity-55 rounded-3xl flex items-center justify-center cursor-not-allowed"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
