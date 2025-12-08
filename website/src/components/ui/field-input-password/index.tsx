import { forwardRef, useState } from "react";
import { FieldInput, FieldInputProps } from "../field-input";
import { IconInputContainer } from "../icon-input-container";
import { Eye, EyeOff } from "lucide-react";

export interface FieldInputPasswordProps
  extends Omit<FieldInputProps, "type"> {}
export const FieldInputPassword = forwardRef<
  HTMLInputElement,
  FieldInputPasswordProps
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const endElement = showPassword ? (
    <IconInputContainer svg={EyeOff} onClick={() => setShowPassword(false)} />
  ) : (
    <IconInputContainer svg={Eye} onClick={() => setShowPassword(true)} />
  );

  return (
    <FieldInput
      {...props}
      ref={ref}
      type={showPassword ? "text" : "password"}
      endElement={endElement}
    />
  );
});
