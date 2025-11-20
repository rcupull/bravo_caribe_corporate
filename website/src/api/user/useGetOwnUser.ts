import { FetchFnCallArgsGetter, FetchResource } from "@/types/api";
import { User } from "@/types/auth";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

const fetchFnCallArgsGetter: FetchFnCallArgsGetter<void> = () => ({
  method: "get",
  url: getEndpoint({
    path: "/users/own",
  }),
});

export const useGetOwnUser = (): {
  getOwnUser: FetchResource<void, User>;
} => {
  return {
    getOwnUser: useQueryMutation<void, User>({
      fetch: async () => {
        const response = await axiosFetch(fetchFnCallArgsGetter());
        return response.data;
      },
    }),
  };
};

useGetOwnUser.fetchFnCallArgsGetter = fetchFnCallArgsGetter;
