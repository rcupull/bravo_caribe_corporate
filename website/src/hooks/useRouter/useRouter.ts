import { Params, UseRouterReturn } from "./types";
import { fillBrowserRoute, queryToSearch, searchToQuery } from "./utils";

import { getFlattenJson } from "@/utils/general";
import { usePageContext } from "../usePageContext";
import { navigate } from "vike/client/router";
import { Query } from "@/types/api";

export const useRouter = (): UseRouterReturn => {
  const { routeParams, urlPathname: pathname, urlParsed } = usePageContext();

  const { searchOriginal: search } = urlParsed;

  const query = (search ? searchToQuery(search.slice(1)) : {}) as Query;

  const onChangeQuery: UseRouterReturn["onChangeQuery"] = (
    newQuery,
    options
  ) => {
    const { timeout, replaceAll, replaceLastHistoryEntry } = options || {};
    const handle = () => {
      const updatedQuery = replaceAll
        ? getFlattenJson(newQuery)
        : getFlattenJson({ ...query, ...newQuery });

      navigate(
        fillBrowserRoute({
          path: pathname,
          query: updatedQuery,
        }),
        {
          overwriteLastHistoryEntry: replaceLastHistoryEntry,
        }
      );
    };

    if (timeout) {
      setTimeout(handle, timeout);
      return;
    }
    handle();
  };

  return {
    params: routeParams as Params,
    query,
    onChangeQuery,
    pathname,
    queryToSearch,
    onBack: () => window.history.back(),
    pushRoute: (pathname, query, options) => {
      const { timeout, replace } = options || {};

      if (pathname.startsWith("http")) {
        window.location.replace(pathname);
        return;
      }

      const handle = () => {
        navigate(
          fillBrowserRoute({
            path: pathname,
            query,
          }),
          {
            overwriteLastHistoryEntry: replace,
          }
        );
      };

      if (timeout) {
        setTimeout(handle, timeout);
        return;
      }
      handle();
    },
  };
};
