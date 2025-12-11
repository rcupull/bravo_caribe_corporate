import { FetchResource } from "@/types/api";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  newPassword: string;
  code: string;
}

interface Out {
  email?: string;
  phone?: string;
}

export const useAuthForgotPasswordValidate = (): {
  authForgotPasswordValidate: FetchResource<Args, Out>;
} => {
  return {
    authForgotPasswordValidate: useQueryMutation<Args, Out>({
      fetch: async (data) => {
        const response = await axiosFetch({
          method: "post",
          url: getEndpoint({ path: "/auth/forgot-password-validate" }),
          data,
        });
        return response.data;
      },
    }),
  };
};
