import { usePageContext } from "@/hooks/usePageContext";
import { FetchResource } from "@/types/api";
import { User } from "@/types/auth";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  userId: string;
  update: Pick<User, "role">;
}

export const useUpdateOneUser = (): {
  updateOneUser: FetchResource<Args, User>;
} => {
  const pageContext = usePageContext();
  return {
    updateOneUser: useQueryMutation<Args, User>({
      fetch: async ({ update, userId }) => {
        const response = await axiosFetch(
          {
            method: "put",
            url: getEndpoint({
              path: "/users/:userId",
              urlParams: { userId },
            }),
            data: update,
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
