import { FetchResource } from "@/types/api";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  newPassword: string;
}

export const useAuthChangePassword = (): {
  authChangePassword: FetchResource<Args, void>;
} => {
  return {
    authChangePassword: useQueryMutation<Args, void>({
      fetch: async ({ newPassword }) => {
        const response = await axiosFetch({
          method: "post",
          url: getEndpoint({ path: "/auth/change-password" }),
          data: { newPassword },
        });
        return response.data;
      },
    }),
  };
};
