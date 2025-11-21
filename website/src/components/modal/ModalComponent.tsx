import { cloneElement } from "react";

import { ModalProps } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/utils/general";
interface ModalComponentProps extends ModalProps {
  open: boolean;
}

export const ModalComponent = (props: ModalComponentProps) => {
  const {
    title,
    description,
    content,
    primaryBtn,
    closeButton,
    className,
    open,
    onClose,
  } = props;

  const renderCloseBtn = () => {
    if (!closeButton) return null;

    return cloneElement(closeButton, {
      className: cn("w-full sm:w-auto mt-3 sm:mt-0", {
        "ml-0 sm:ml-3": primaryBtn,
        "ml-0 sm:ml-auto": !primaryBtn,
      }),
    });
  };

  const renderButtons = () => {
    if (!primaryBtn && !closeButton) {
      return null;
    }

    return (
      <div className={cn("bg-gray-50 sm:flex sm:flex-row mt-auto")}>
        {primaryBtn &&
          cloneElement(primaryBtn, {
            className: cn(
              "w-full sm:w-auto ml-auto",
              primaryBtn.props.className
            ),
          })}

        {renderCloseBtn()}
      </div>
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {content}
        {renderButtons()}
      </DialogContent>
    </Dialog>
  );
};
