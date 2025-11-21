import { FetchResource } from "@/types/api";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  email: string;
  password: string;
  name: string;
}
export const useAuthSignUp = (): {
  authSignUp: FetchResource<Args>;
} => {
  return {
    authSignUp: useQueryMutation<Args, void>({
      fetch: async (data) => {
        const response = await axiosFetch({
          method: "post",
          url: getEndpoint({ path: "/auth/sign-up" }),
          data,
        });
        return response.data;
      },
    }),
  };
};
