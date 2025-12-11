import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  blogSlug: string;
}

export const useAdminRemoveOneBlog = (): {
  adminRemoveOneBlog: FetchResource<Args>;
} => {
  const pageContext = usePageContext();
  return {
    adminRemoveOneBlog: useQueryMutation<Args, void>({
      fetch: async ({ blogSlug }) => {
        const response = await axiosFetch(
          {
            method: "delete",
            url: getEndpoint({
              path: "/admin/blogs/:blogSlug",
              urlParams: {
                blogSlug,
              },
            }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
