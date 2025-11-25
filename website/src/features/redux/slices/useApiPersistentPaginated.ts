import { useSimpleSlice } from "./useSimpleSlice";

import { AnyRecord } from "@/types/general";
import { FetchResourceWithPagination, PaginatedData } from "@/types/api";
import { getPaginationResources } from "@/utils/pagination";

interface PersistentState<D extends AnyRecord = AnyRecord> {
  data: PaginatedData<D>["data"] | null;
  paginator: PaginatedData<D>["paginator"] | null;
  isPending: boolean;
}

export const useApiPersistentPaginated = <
  Args = any,
  D extends AnyRecord = AnyRecord
>(
  field: string,
  resources: FetchResourceWithPagination<Args, D>
): FetchResourceWithPagination<Args, D> => {
  const {
    data: state,
    reset,
    setData,
  } = useSimpleSlice<PersistentState<D>>(field);

  //@ts-expect-error ignore
  return {
    ...resources,
    isPending: state?.isPending || resources.isPending,
    //@ts-expect-error ignore
    ...getPaginationResources(state),
    fetch: (args, options = {}) => {
      setData((state) => ({ ...state, isPending: true }));

      resources.fetch(args, {
        ...options,
        onAfterSuccess: (response) => {
          const { data, paginator } = getPaginationResources(response);

          setData((state) => ({ ...state, data, paginator, isPending: false }));

          options?.onAfterSuccess?.(response);
        },
      });
    },
    reset: () => {
      reset();
      resources.reset();
    },
  };
};
