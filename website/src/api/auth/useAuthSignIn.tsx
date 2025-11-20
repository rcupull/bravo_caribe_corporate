import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { AuthDataDto } from "@/types/auth";
import { axiosFetch, getEndpoint } from "@/utils/api";

interface Args {
  password: string;
  email: string;
}

export const useAuthSignIn = (): {
  authSignIn: FetchResource<Args, AuthDataDto>;
} => {
  return {
    authSignIn: useQueryMutation<Args, AuthDataDto>({
      fetch: async ({ password, email }) => {
        const response = await axiosFetch({
          method: "post",
          url: getEndpoint({ path: "/auth/sign-in" }),
          data: {
            username: email,
            password,
          },
        });
        return response.data;
      },
    }),
  };
};
