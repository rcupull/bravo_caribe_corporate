import { useMutation } from "@tanstack/react-query";
import { FetchOptions, FetchResource, FetchData } from "@/types/api";

export const useQueryMutation = <
  FetchArgs extends any,
  Data extends any
>(args: {
  fetch: (args: FetchArgs) => Promise<FetchData<Data>>;
}): FetchResource<FetchArgs, Data> => {
  const mutation = useMutation<
    FetchData<Data>,
    any,
    { fetchArgs: FetchArgs; options?: FetchOptions<Data> }
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

  return {
    ...mutation,
    fetch: (fetchArgs, options) => mutation.mutate({ fetchArgs, options }),
  };
};
