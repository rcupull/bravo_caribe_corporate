import { Modal } from "@/components/modal";
import { useModal } from "./useModal";
import { ModalProps } from "@/components/modal/types";

export interface ModalServiceComponentProps {
  useProps: () => Partial<ModalProps>;
}

export const ModalServiceComponent = ({
  useProps,
}: ModalServiceComponentProps) => {
  const modalProps = useProps();
  const { onClose } = useModal();

  return <Modal content="<Some message>" onClose={onClose} {...modalProps} />;
};

export default ModalServiceComponent;
