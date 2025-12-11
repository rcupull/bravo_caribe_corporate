import { ChildrenProp, StyleProps } from "@/types/general";
import { PopoverWrapper } from "./PopoverWrapper";
import { cn, isFunction } from "@/utils/general";
import { isSSR } from "@/utils/ssr";

export interface PopoverProps extends ChildrenProp, StyleProps {
  content:
    | React.ReactNode
    | ((args: { onClose: () => void }) => React.ReactNode);
  open?: boolean;
  onOpen?: (open: boolean) => void;
  disabled?: boolean;
}

export const Popover = ({
  children,
  content,
  open,
  onOpen,
  disabled,
  className,
}: PopoverProps) => {
  if (isSSR()) {
    return (
      <div
        className={cn(
          "w-fit",
          {
            "cursor-not-allowed": disabled,
            "cursor-pointer": !disabled,
          },
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <PopoverWrapper open={open} onOpen={onOpen} disabled={disabled}>
      {({
        getReferenceProps,
        getFloatingProps,
        refs,
        isOpen,
        floatingStyles,
        toggle,
      }) => (
        <>
          <div
            ref={refs.setReference}
            {...getReferenceProps()}
            className={cn(
              "w-fit",
              {
                "cursor-not-allowed": disabled,
                "cursor-pointer": !disabled,
              },
              className
            )}
          >
            {children}
          </div>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                zIndex: 1000,
              }}
              {...getFloatingProps()}
            >
              {isFunction(content)
                ? content({
                    onClose: () => toggle(false),
                  })
                : content}
            </div>
          )}
        </>
      )}
    </PopoverWrapper>
  );
};
