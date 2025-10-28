import { forwardRef } from "react";

import { InputProps } from "./types";
import { cn } from "@/utils/general";

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type } = props;

  const renderInput = (props: InputProps) => {
    const {
      className,
      endElement,
      startElement,
      preventDefaultEnter,
      typeByRegex,
      inputClassName,
      maxLength,
      ...omittedProps
    } = props;

    return (
      <div className={cn("relative", className)}>
        {startElement && (
          <div className="absolute h-full top-0 left-0 flex items-center">
            {startElement}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "rounded-md border border-input ring-offset-background",
            "block w-full h-full py-4 bg-white text-gray-900",
            "placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary focus-visible:outline-none",
            "sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:cursor-not-allowed",
            {
              "pr-12": endElement,
              "pl-12": startElement,
            },
            "px-3",
            inputClassName
          )}
          {...omittedProps}
          onInput={(e) => {
            /**
             * https://stackoverflow.com/questions/18510845/maxlength-ignored-for-input-type-number-in-chrome
             */
            // @ts-expect-error this work fine
            if (isNumber(maxLength) && e.target.value?.length > maxLength) {
              // @ts-expect-error this work fine
              e.target.value = e.target.value.slice(0, maxLength);
            }
          }}
          onKeyPress={(event) => {
            /**
             * can not type any character if not match the regex
             */
            if (typeByRegex && !typeByRegex.test(event.key)) {
              event.preventDefault();
            }

            omittedProps.onKeyPress?.(event);
          }}
          onKeyDown={(e) => {
            if (preventDefaultEnter && e.key === "Enter") {
              e.preventDefault();
            }
            omittedProps.onKeyDown?.(e);
          }}
        />
        {endElement && (
          <div className="absolute h-full top-0 right-0 flex items-center">
            {endElement}
          </div>
        )}
      </div>
    );
  };

  if (type === "number") {
    return renderInput({
      ...props,
      onChange: (e) => {
        props?.onChange?.({
          ...e,
          target: {
            ...e.target,
            //@ts-expect-error ignore this error, it is necessary for now
            value: e.target.value === "" ? undefined : Number(e.target.value),
          },
        });
      },
    });
  }

  return renderInput(props);
});
