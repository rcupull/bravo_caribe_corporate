import { AnyRecord } from "@/types/general";
import { useSimpleSlice } from "./useSimpleSlice";
import {
  FetchOptions,
  FetchResource,
  SliceApiPersistentState,
} from "@/types/api";

type ApiPersistent<Args = any, D = any> = FetchResource<Args, D> & {
  setData: (d: D) => void;
  resetData: () => void;
};

export const useApiPersistent = <Args = any, D extends AnyRecord = AnyRecord>(
  field: string,
  resources: FetchResource<Args, D>
): ApiPersistent<Args, D> => {
  const { data, reset, setData } =
    useSimpleSlice<SliceApiPersistentState>(field);

  return {
    ...resources,
    isPending: data?.isPending || resources.isPending,
    data: data?.data || null,
    fetch: (args: Args, options: FetchOptions = {}) => {
      setData((state) => ({ ...state, isPending: true }));

      resources.fetch(args, {
        ...options,
        onAfterSuccess: async (data) => {
          await options?.onAfterSuccess?.(data);

          setData({ data, isPending: false });
        },
      });
    },
    resetData: () => {
      reset();
      resources.reset();
    },
    setData: (data) => setData((state) => ({ ...state, data })),
  };
};
