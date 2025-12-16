import { usePageContext } from "@/hooks/usePageContext";
import { FetchResource } from "@/types/api";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  code: string;
}

interface AuthValidateReturn {
  email: string;
}

export const useAuthValidate = (): {
  authValidate: FetchResource<Args, AuthValidateReturn>;
} => {
  const pageContext = usePageContext();

  return {
    authValidate: useQueryMutation<Args, AuthValidateReturn>({
      fetch: async ({ code }) => {
        const response = await axiosFetch(
          {
            method: "post",
            url: getEndpoint({ path: "/auth/validate" }),
            data: { code },
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
