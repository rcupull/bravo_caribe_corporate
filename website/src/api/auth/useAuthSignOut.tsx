import { FetchResource } from "@/types/api";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

export const useAuthSignOut = (): {
  authSignOut: FetchResource<void, void>;
} => {
  return {
    authSignOut: useQueryMutation<void, void>({
      fetch: async () => {
        // const refreshToken = await getPersistent("refreshToken");

        const refreshToken = null;

        const response = await axiosFetch({
          method: "get",
          url: getEndpoint({ path: "/auth/sign-out" }),
          data: { refreshToken },
        });
        return response.data;
      },
    }),
  };
};
