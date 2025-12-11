import { Query, UrlParams } from "@/types/api";
import { injectUrlParams } from "@/utils/api";
import { isEmpty } from "@/utils/general";
import qs from "query-string";

export const queryToSearch = (query: Query): string =>
  qs.stringify(query, {
    arrayFormat: "bracket",
    skipEmptyString: true,
  });

export const searchToQuery = (search: string): Query =>
  qs.parse(search, {
    parseNumbers: true,
    arrayFormat: "bracket",
    parseBooleans: true,
  });

export const fillBrowserRoute = ({
  path,
  query,
  urlParams,
}: {
  path: string;
  query?: Query;
  urlParams?: UrlParams;
}) => {
  let out = injectUrlParams(path, urlParams);

  if (!isEmpty(query)) {
    out = `${out}?${queryToSearch(query)}`;
  }

  if (out[out.length - 1] === "?") {
    out = out.slice(0, -1);
  }

  return out;
};
