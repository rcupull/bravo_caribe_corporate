import ModalServiceComponent from "./ModalServiceComponent";
import { useModal } from "./useModal";

export const ModalContainer = (): JSX.Element | null => {
  const { modalsData } = useModal();

  return (
    <>
      {modalsData?.map(({ props }, index) => {
        return <ModalServiceComponent key={index} {...props} />;
      })}
    </>
  );
};
