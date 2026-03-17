import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { usePageContext } from "@/hooks/usePageContext";
import { User } from "@/types/auth";

interface Args {
  search?: string;
}

export const useGetAllUsers = (): {
  getAllUsers: FetchResourceWithPagination<Args, User>;
} => {
  const pageContext = usePageContext();
  return {
    getAllUsers: useQueryMutationWithPagination<Args, User>({
      fetch: async () => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({ path: "/users" }),
          },
          pageContext,
        );
        return response.data;
      },
    }),
  };
};
