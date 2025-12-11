import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { Blog } from "@/types/blog";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  blogSlug: string;
  update: Pick<
    Blog,
    | "title"
    | "coverImage"
    | "hidden"
    | "description"
    | "message"
    | "author"
    | "featured"
  >;
}

export const useAdminUpdateOneBlog = (): {
  adminUpdateOneBlog: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    adminUpdateOneBlog: useQueryMutation<Args, void>({
      fetch: async ({ blogSlug, update }) => {
        const response = await axiosFetch(
          {
            method: "put",
            url: getEndpoint({
              path: "/admin/blogs/:blogSlug",
              urlParams: { blogSlug },
            }),
            data: update,
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
