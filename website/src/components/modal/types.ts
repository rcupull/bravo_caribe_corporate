import { StyleProps } from "@/types/general";

export interface ModalProps extends StyleProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  content: React.ReactNode;
  primaryBtn?: React.ReactElement;
  closeButton?: React.ReactElement;
  onClose: () => void;
}
