import { GetEndpoint, Query, UrlParams } from "@/types/api";
import { isEmpty, isNullOrUndefined } from "./general";
import qs from "query-string";

export const getEndpointUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8081";
  }

  return ""; //TODO
  // return "https://api-dev.bessandsolar.com/api";
};

export const injectUrlParams = (
  url: string,
  urlParams: UrlParams = {}
): string => {
  let filledUrl = url;

  Object.entries(urlParams).forEach(([key, value]) => {
    const pattern = `:${key}`;
    if (filledUrl.includes(pattern) && value !== undefined) {
      filledUrl = filledUrl.replace(pattern, value.toString());
    }
  });

  return filledUrl;
};

export const paramsSerializer = (query: Query): string => {
  return qs.stringify(query, { arrayFormat: "comma" });
};

export const fillPath = ({
  path,
  query,
  urlParams,
}: {
  path: string;
  query?: Query;
  urlParams?: UrlParams;
}): string => {
  const flattenPath = injectUrlParams(path, urlParams);

  const getFlattenParams = (value: Query): Query =>
    Object.entries(value).reduce((acc, [k, v]) => {
      if (isNullOrUndefined(v)) return acc;
      return { ...acc, [k]: v };
    }, {});

  const flattenParams = query && getFlattenParams(query);

  if (isEmpty(flattenParams)) {
    return flattenPath;
  }

  return `${flattenPath}?${paramsSerializer(flattenParams)}`;
};

export const getEndpoint: GetEndpoint = ({ path, query, urlParams }) => {
  const flattenPath = fillPath({
    path,
    query,
    urlParams,
  });

  return `${getEndpointUrl()}${flattenPath}`;
};
