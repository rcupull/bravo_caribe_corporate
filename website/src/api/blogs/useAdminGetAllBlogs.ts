import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { Blog } from "@/types/blog";

export const useAdminGetAllBlogs = (): {
  adminGetAllBlogs: FetchResourceWithPagination<void, Blog>;
} => {
  return {
    adminGetAllBlogs: useQueryMutationWithPagination<void, Blog>({
      fetch: async () => {
        const response = await axiosFetch({
          method: "get",
          url: getEndpoint({ path: "/admin/blogs" }),
        });
        return response.data;
      },
    }),
  };
};
