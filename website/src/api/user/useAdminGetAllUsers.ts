import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { usePageContext } from "@/hooks/usePageContext";
import { User } from "@/types/auth";

interface Args {
  search?: string;
}

export const useAdminGetAllUsers = (): {
  adminGetAllUsers: FetchResourceWithPagination<Args, User>;
} => {
  const pageContext = usePageContext();
  return {
    adminGetAllUsers: useQueryMutationWithPagination<Args, User>({
      fetch: async () => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({ path: "/admin/users" }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
