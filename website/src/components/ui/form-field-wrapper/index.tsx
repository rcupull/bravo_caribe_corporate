import { Nullable, StyleProps } from "@/types/general";
import { cn } from "@/utils/general";
import { Label } from "../label";

export interface FormFieldWrapperProps extends StyleProps {
  label?: React.ReactNode;
  labelPosition?: "top" | "right";
  description?: React.ReactNode;
}

export const FormFieldWrapper = ({
  className,
  label,
  error,
  children,
  labelPosition = "top",
  description,
}: FormFieldWrapperProps & {
  children: React.ReactNode;
  error?: Nullable<string>;
}) => {
  const labelElement = (label || description) && (
    <div
      className={cn("flex gap-2 items-center h-7", {
        "ml-2": labelPosition === "right",
      })}
    >
      {label && (
        <Label
          className={cn({
            "text-red-500": !!error,
          })}
        >
          {label}
        </Label>
      )}
    </div>
  );

  return (
    <div data-id="FormFieldWrapper" className={cn(className)}>
      {labelPosition === "right" && (
        <div className={cn("flex items-center")}>
          {children}
          {labelElement}
        </div>
      )}

      {labelPosition === "top" && (
        <div>
          {labelElement}
          {children}
        </div>
      )}

      <div className="text-red-500 text-xs text-start ml-4 mt-0.5">{error}</div>
    </div>
  );
};
