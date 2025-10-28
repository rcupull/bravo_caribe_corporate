import { useMutation } from "@tanstack/react-query";
import {
  FetchOptions,
  FetchResourceWithPagination,
  FetchData,
  PaginatedData,
} from "@/types/api";

export const useQueryMutationWithPagination = <
  FetchArgs extends any,
  Data extends any
>(args: {
  fetch: (
    args: FetchArgs,
    options?: FetchOptions<Array<Data>>
  ) => Promise<FetchData<PaginatedData<Data>>>;
}): FetchResourceWithPagination<FetchArgs, Data> => {
  const { data, ...mutation } = useMutation<
    FetchData<PaginatedData<Data>>,
    any,
    {
      fetchArgs: FetchArgs;
      options?: FetchOptions<Array<Data>>;
    }
  >({
    mutationFn: ({ fetchArgs }) => args.fetch(fetchArgs),
    onSuccess: (data, { options }) => {
      const { onAfterSuccess } = options || {};
      onAfterSuccess?.(data.data);
    },
    onError: (error, { options }) => {
      const { onAfterFailed } = options || {};
      onAfterFailed?.(error);
    },
  });

  //@ts-expect-error ignore
  return {
    ...mutation,
    data: [],
    paginator: data?.paginator || null,
    fetch: (fetchArgs, options) => mutation.mutate({ fetchArgs, options }),
  };
};
