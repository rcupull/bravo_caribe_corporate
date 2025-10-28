import { FetchResource } from "@/types/api";
import { getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import axios from "axios";

export const useAuthSignOut = (): {
  authSignOut: FetchResource<void, void>;
} => {
  return {
    authSignOut: useQueryMutation<void, void>({
      fetch: async () => {
        // const refreshToken = await getPersistent("refreshToken");

        const refreshToken = null;

        const response = await axios({
          method: "get",
          url: getEndpoint({ path: "/auth/sign-out" }),
          data: { refreshToken },
        });
        return response.data;
      },
    }),
  };
};
