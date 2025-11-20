import { useMutation } from "@tanstack/react-query";
import {
  FetchOptions,
  FetchResourceWithPagination,
  FetchData,
  PaginatedData,
} from "@/types/api";
import { getPaginationResources } from "./pagination";

export const useQueryMutationWithPagination = <
  FetchArgs extends any,
  Data extends any
>(args: {
  fetch: (
    args: FetchArgs,
    options?: FetchOptions<PaginatedData<Data>>
  ) => Promise<FetchData<PaginatedData<Data>>>;
}): FetchResourceWithPagination<FetchArgs, Data> => {
  const { data, ...mutation } = useMutation<
    FetchData<PaginatedData<Data>>,
    any,
    {
      fetchArgs: FetchArgs;
      options?: FetchOptions<PaginatedData<Data>>;
    }
  >({
    mutationFn: ({ fetchArgs }) => args.fetch(fetchArgs),
    onSuccess: (data, { options }) => {
      const { onAfterSuccess } = options || {};
      onAfterSuccess?.(data);
    },
    onError: (error, { options }) => {
      const { onAfterFailed } = options || {};
      onAfterFailed?.(error);
    },
  });

  //@ts-expect-error ignore
  return {
    ...mutation,
    ...getPaginationResources(data),
    fetch: (fetchArgs, options) => mutation.mutate({ fetchArgs, options }),
  };
};
