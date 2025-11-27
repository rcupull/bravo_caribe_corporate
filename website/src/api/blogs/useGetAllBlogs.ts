import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResourceWithPagination } from "@/types/api";
import { useQueryMutationWithPagination } from "@/utils/useQueryMutationWithPagination";
import { CategoryType } from "@/types/category";
import { Blog } from "@/types/blog";

interface Args {
  categoryType?: CategoryType;
  featured?: boolean;
}

export const useGetAllBlogs = (): {
  getAllBlogs: FetchResourceWithPagination<Args | void, Blog>;
} => {
  return {
    getAllBlogs: useQueryMutationWithPagination<Args | void, Blog>({
      fetch: async (args = {}) => {
        const response = await axiosFetch({
          method: "get",
          url: getEndpoint({ path: "/blogs", query: { ...args } }),
        });
        return response.data;
      },
    }),
  };
};
