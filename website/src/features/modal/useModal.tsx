import { ModalData, ModalWindowOptions } from "./types";
import { useContext } from "react";
import { ModalContext } from "./modalContext";
import { ModalServiceComponentProps } from "./ModalServiceComponent";

type OnCloseFn = () => void;
type OnCloseAllFn = () => void;
type PushModal = (
  props: ModalServiceComponentProps,
  options?: ModalWindowOptions
) => void;

type OnIsOpen = () => boolean;

export const useModal = (): {
  pushModal: PushModal;
  onClose: OnCloseFn;
  onCloseAll: OnCloseAllFn;
  onIsOpen: OnIsOpen;
  modalsData: Array<ModalData>;
} => {
  const { modalsData, setModalsData } = useContext(ModalContext);

  ///////////////////////////////////////////////////////////////////////////////////////////

  const onClose: OnCloseFn = () => {
    setModalsData((currentState) => currentState.slice(0, -1));
  };

  const onCloseAll = () => setModalsData([]);
  const pushModal: PushModal = (props, options) => {
    const { timeout } = options || {};

    const handlePush = () => {
      setModalsData((state) => [...state, { props }]);
    };

    if (timeout) {
      setTimeout(handlePush, timeout);
      return;
    }
    handlePush();
  };

  const onIsOpen: OnIsOpen = () => {
    return !!modalsData.length;
  };

  return {
    pushModal,
    onClose,
    onCloseAll,
    onIsOpen,
    modalsData,
  };
};
