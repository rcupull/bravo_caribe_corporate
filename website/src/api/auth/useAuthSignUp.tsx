import { FetchResource } from "@/types/api";
import { getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import axios from "axios";

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
        const response = await axios({
          method: "post",
          url: getEndpoint({ path: "/auth/sign-up" }),
          data,
        });
        return response.data;
      },
    }),
  };
};
