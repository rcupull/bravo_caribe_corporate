import { ModalServiceComponentProps } from "@/features/modal/ModalServiceComponent";
import { useModal } from "@/features/modal/useModal";
import { AnyRecord } from "@/types/general";

export const useModalPage = <T extends AnyRecord | void = void>(
  propsFactory: (args: T) => ModalServiceComponentProps
) => {
  const { pushModal } = useModal();

  return {
    open: (args: T) => {
      pushModal(propsFactory(args));
    },
  };
};
