import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  userId: string;
}

export const useRemoveOneUser = (): {
  removeOneUser: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    removeOneUser: useQueryMutation<Args, void>({
      fetch: async ({ userId }) => {
        const response = await axiosFetch(
          {
            method: "delete",
            url: getEndpoint({
              path: "/users/:userId",
              urlParams: { userId },
            }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
