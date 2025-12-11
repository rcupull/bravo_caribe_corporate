import { axiosFetch, getEndpoint } from "@/utils/api";
import { FetchResource } from "@/types/api";
import { useQueryMutation } from "@/utils/useQueryMutation";
import { Blog } from "@/types/blog";
import { usePageContext } from "@/hooks/usePageContext";

interface Args {
  blogSlug?: string;
}

export const useGetOneBlog = (): {
  getOneBlog: FetchResource<Args, Blog>;
} => {
  const pageContext = usePageContext();
  return {
    getOneBlog: useQueryMutation<Args, Blog>({
      fetch: async ({ blogSlug }) => {
        const response = await axiosFetch(
          {
            method: "get",
            url: getEndpoint({
              path: "/blogs/:blogSlug",
              urlParams: { blogSlug },
            }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
