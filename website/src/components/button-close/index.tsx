import { useModal } from "@/features/modal/useModal";
import { Button, ButtonProps } from "../ui/button";

export interface ButtonCloseProps extends ButtonProps {}

export const ButtonClose = ({ children = "Cerrar", ...props }) => {
  const { onClose } = useModal();

  return (
    <Button type="button" variant="outline" onClick={onClose} {...props}>
      {children}
    </Button>
  );
};
