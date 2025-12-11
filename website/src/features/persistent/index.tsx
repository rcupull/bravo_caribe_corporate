import { ChildrenProp } from "@/types/general";
import { persistentBackdoor } from "./Context";
import { Provider } from "./Provider";
import { usePersistentContext } from "./usePersistentContext";

const BackdoorFactory = () => {
  const { getPersistent, removePersistent, setPersistent } =
    usePersistentContext();

  persistentBackdoor.getPersistent = getPersistent;
  persistentBackdoor.setPersistent = setPersistent;
  persistentBackdoor.removePersistent = removePersistent;

  return null;
};

export const PersistentProvider = ({ children }: ChildrenProp) => {
  return (
    <Provider>
      <BackdoorFactory />
      {children}
    </Provider>
  );
};
