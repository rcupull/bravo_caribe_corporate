import {
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  UseFloatingReturn,
  useInteractions,
  UseInteractionsReturn,
} from "@floating-ui/react";
import { useState } from "react";

// https://floating-ui.com/docs/getting-started

export interface PopoverWrapperProps {
  children: (
    args: UseFloatingReturn &
      UseInteractionsReturn & {
        isOpen: boolean;
        toggle: (val: boolean) => void;
      }
  ) => React.ReactNode;
  open?: boolean;
  onOpen?: (open: boolean) => void;
  disabled?: boolean;
}

export const PopoverWrapper = ({
  children,
  open,
  onOpen,
  disabled,
}: PopoverWrapperProps) => {
  const [isOpen, setIsOpen] = useState(open ?? false);

  const floating = useFloating({
    open: isOpen,
    onOpenChange: (o) => {
      setIsOpen(o);
      onOpen?.(o);
    },
    middleware: [offset(8), flip(), shift()],
  });

  const { context, update } = floating;

  const click = useClick(context, {
    enabled: !disabled,
  });
  const dismiss = useDismiss(context, {
    ancestorScroll: true,
  });
  const interactions = useInteractions([click, dismiss]);

  const toggle = (nextState: boolean) => {
    if (disabled) return;

    setIsOpen(nextState);
    onOpen?.(nextState);
    update();
  };

  return children({ ...floating, ...interactions, isOpen, toggle });
};
