import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { Blog } from "@/types/blog";

interface Args
  extends Pick<
    Blog,
    "title" | "message" | "coverImage" | "description" | "hidden"
  > {}

export const useAdminAddOneBlog = (): {
  adminAddOneBlog: FetchResource<Args>;
} => {
  return {
    adminAddOneBlog: useQueryMutation<Args, void>({
      fetch: async (data) => {
        const response = await axiosFetch({
          method: "post",
          url: getEndpoint({ path: "/admin/blogs" }),
          data,
        });
        return response.data;
      },
    }),
  };
};
