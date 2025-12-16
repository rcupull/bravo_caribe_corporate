import { usePageContext } from "@/hooks/usePageContext";
import { FetchFnCallArgsGetter, FetchResource } from "@/types/api";
import { Shopping } from "@/types/shopping";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

const fetchFnCallArgsGetter: FetchFnCallArgsGetter<void> = () => ({
  method: "get",
  url: getEndpoint({
    path: "/cart",
  }),
});

export const useGetCart = (): {
  getCart: FetchResource<void, Shopping | null>;
} => {
  const pageContext = usePageContext();

  return {
    getCart: useQueryMutation<void, Shopping | null>({
      fetch: async () => {
        const response = await axiosFetch(fetchFnCallArgsGetter(), pageContext);
        return response.data;
      },
    }),
  };
};

useGetCart.fetchFnCallArgsGetter = fetchFnCallArgsGetter;
