import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  blogSlug: string;
}

export const useAdminRemoveOneBlog = (): {
  adminRemoveOneBlog: FetchResource<Args>;
} => {
  return {
    adminRemoveOneBlog: useQueryMutation<Args, void>({
      fetch: async ({ blogSlug }) => {
        const response = await axiosFetch({
          method: "delete",
          url: getEndpoint({
            path: "/admin/blogs/:blogSlug",
            urlParams: {
              blogSlug,
            },
          }),
        });
        return response.data;
      },
    }),
  };
};
