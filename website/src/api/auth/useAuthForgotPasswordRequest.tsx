import { FetchResource } from "@/types/api";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  email?: string;
  phone?: string;
}

export const useAuthForgotPasswordRequest = (): {
  authForgotPasswordRequest: FetchResource<Args, void>;
} => {
  return {
    authForgotPasswordRequest: useQueryMutation<Args, void>({
      fetch: async (data) => {
        const response = await axiosFetch({
          method: "post",
          url: getEndpoint({ path: "/auth/forgot-password-request" }),
          data,
        });
        return response.data;
      },
    }),
  };
};
