import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/general";
import { FormuxDataContainer } from "./formux-data-container";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-warning hover:text-warning-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  formuxSubmit?: boolean;
  stopPropagation?: boolean;
  preventDefault?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      isLoading,
      formuxSubmit,
      disabled,
      onClick,
      stopPropagation,
      preventDefault,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    if (formuxSubmit) {
      return (
        <FormuxDataContainer>
          {({ hasChange, isValid, errorMode, setErrorMode }) => {
            const buttonDisabled = disabled || !isValid || !hasChange;

            return (
              <Comp
                className={cn(
                  "relative",
                  buttonVariants({ variant, size, className })
                )}
                ref={ref}
                disabled={isLoading || buttonDisabled}
                onClick={(e) => {
                  /**
                   * Cuando se monta el formulario el mode de error es 'touched' mostrando los errores de validacion en los fields que has sido "tocados"
                   * Pero una vez hecho click en el boton de submit se mustran los restantes erres aunque no hayan sido tocados los fields
                   */
                  if (errorMode === "touched") {
                    setErrorMode("all");
                  }

                  if (stopPropagation) {
                    e.stopPropagation();
                  }

                  if (preventDefault) {
                    e.preventDefault();
                  }

                  if (buttonDisabled) {
                    return;
                  }

                  onClick?.(e);
                }}
                {...props}
              >
                <>
                  {children}
                  {isLoading && (
                    <div className="absolute bg-white opacity-75 inset-0 flex items-center justify-center">
                      <svg
                        className="animate-spin h-6 w-6 fill-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="fill-black"
                          strokeWidth="6"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="fill-black"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </>
              </Comp>
            );
          }}
        </FormuxDataContainer>
      );
    }

    return (
      <Comp
        className={cn("relative", buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || disabled}
        onClick={onClick}
        {...props}
      >
        <>
          {children}
          {isLoading && (
            <div className="absolute bg-white opacity-75 inset-0 flex items-center justify-center">
              <svg
                className="animate-spin h-6 w-6 fill-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="fill-black"
                  strokeWidth="6"
                ></circle>
                <path
                  className="opacity-75"
                  fill="fill-black"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          )}
        </>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
