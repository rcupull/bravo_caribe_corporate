import { usePageContext } from "@/hooks/usePageContext";
import { FetchResource } from "@/types/api";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  newPassword: string;
}

export const useAuthChangePassword = (): {
  authChangePassword: FetchResource<Args, void>;
} => {
  const pageContext = usePageContext();

  return {
    authChangePassword: useQueryMutation<Args, void>({
      fetch: async ({ newPassword }) => {
        const response = await axiosFetch(
          {
            method: "post",
            url: getEndpoint({ path: "/auth/change-password" }),
            data: { newPassword },
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
