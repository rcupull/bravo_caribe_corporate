import { usePageContext } from "@/hooks/usePageContext";
import { FetchResource } from "@/types/api";
import { Shopping } from "@/types/shopping";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

export const useRemoveCart = (): {
  removeCart: FetchResource<void, Shopping | null>;
} => {
  const pageContext = usePageContext();

  return {
    removeCart: useQueryMutation<void, Shopping | null>({
      fetch: async () => {
        const response = await axiosFetch(
          {
            method: "delete",
            url: getEndpoint({
              path: "/cart",
            }),
          },
          pageContext
        );
        return response.data;
      },
    }),
  };
};
