import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { Blog } from "@/types/blog";
import { usePageContext } from "@/hooks/usePageContext";

interface Args
  extends Pick<
    Blog,
    | "title"
    | "message"
    | "coverImage"
    | "description"
    | "hidden"
    | "author"
    | "featured"
  > {}

export const useAdminAddOneBlog = (): {
  adminAddOneBlog: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    adminAddOneBlog: useQueryMutation<Args, void>({
      fetch: async (data) => {
        const response = await axiosFetch(
          {
            method: "post",
            url: getEndpoint({ path: "/admin/blogs" }),
            data,
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
