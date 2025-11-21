import { ReduxState } from "@/types/redux";
import { useDispatch, useSelector, useStore } from "react-redux";

export const useSimpleSlice = <D = any, N extends string = string>(
  name: N
): {
  setData: (dataHandle: D | ((oldData: D) => D)) => void;
  reset: () => void;
  data: D;
} => {
  const dispatch = useDispatch();
  const store = useStore<ReduxState>();
  const data = useSelector<{ [k in N]: D }, D>((state) => state[name]);

  return {
    data,
    setData: (d) => {
      //@ts-expect-error ignore
      const currentData = store.getState()[name];

      if (d instanceof Function) {
        dispatch({ type: `${name}/setState`, payload: d(currentData) });
      } else {
        dispatch({ type: `${name}/setState`, payload: d });
      }
    },
    reset: () => {
      dispatch({ type: `${name}/reset` });
    },
  };
};
