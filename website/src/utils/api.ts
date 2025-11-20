import { GetEndpoint, Query, UrlParams } from "@/types/api";
import { isEmpty, isNullOrUndefined, isNumber, isString } from "./general";
import qs from "query-string";
import { AxiosPromise, AxiosRequestConfig } from "axios";
import { axiosClient } from "./axios";
import { differenceInSeconds } from "date-fns";
import { Nullable } from "@/types/general";
import {
  getPersistentAuthData,
  resetPersistentAuthData,
  setPersistentAuthData,
} from "./persistent-auth";

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

const getNewAccessToken = async (args: {
  refreshToken: string;
}): Promise<string | null> => {
  const { refreshToken } = args;

  return new Promise((resolve, reject) => {
    axiosClient({
      method: "post",
      url: getEndpoint({ path: "/auth/refresh" }),
      data: { refreshToken },
    })
      .then((response) => {
        resolve(response.data.accessToken);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * fetchingTokenPromise allows group multiples calls to get a new access token
 */

let fetchingTokenPromise: Promise<string | null> | null = null;
const getNewAccessTokenValidatinProgress = (args: {
  refreshToken: string;
}): Promise<string | null> => {
  const { refreshToken } = args;

  if (!fetchingTokenPromise) {
    fetchingTokenPromise = new Promise<string | null>((resolve) => {
      getNewAccessToken({ refreshToken })
        .then((newAccessToken) => {
          fetchingTokenPromise = null;
          resolve(newAccessToken);
        })
        .catch(() => {
          fetchingTokenPromise = null;
          resolve(null);
        });
    });
  }

  return fetchingTokenPromise;
};

const getAuthData = async (): Promise<{
  accessToken: string | null;
  accessTokenUpdatedAt: string | null;
  refreshToken: string | null;
  steat: number | null;
}> => {
  const isSSR = () => false;

  if (isSSR()) {
    // /**
    //  * get auth data from server side
    //  */
    // const accessToken = getCookieValueFromPageContext(
    //   pageContext,
    //   "accessToken"
    // );
    // const refreshToken = getCookieValueFromPageContext(
    //   pageContext,
    //   "refreshToken"
    // );
    // const accessTokenUpdatedAt = getCookieValueFromPageContext(
    //   pageContext,
    //   "accessTokenUpdatedAt"
    // );
    // const steat = getCookieValueFromPageContext(pageContext, "steat");
    // return {
    //   accessToken,
    //   accessTokenUpdatedAt,
    //   refreshToken,
    //   steat: isNaN(Number(steat)) ? null : Number(steat),
    // };
  } else {
    /**
     * get auth data from client side
     */
    const { accessToken, accessTokenUpdatedAt, refreshToken, steat } =
      await getPersistentAuthData();

    return {
      accessToken,
      accessTokenUpdatedAt,
      refreshToken,
      steat,
    };
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  const { accessToken, accessTokenUpdatedAt, refreshToken, steat } =
    await getAuthData();

  if (!isString(accessToken)) return null;
  if (!isString(refreshToken)) return null;
  if (!isString(accessTokenUpdatedAt)) return null;
  if (!isNumber(steat)) return null;

  const diff =
    isString(accessTokenUpdatedAt) &&
    Math.abs(differenceInSeconds(new Date(), new Date(accessTokenUpdatedAt)));
  const accessTokenIsOutOfDate =
    isNumber(steat) && isNumber(diff) && diff >= steat - 10;

  if (accessTokenIsOutOfDate) {
    const newAccessToken = await getNewAccessTokenValidatinProgress({
      refreshToken,
    });

    const isSSR = () => false;

    if (!isSSR()) {
      /**
       * has in the browser
       */
      if (newAccessToken) {
        setPersistentAuthData({ accessToken: newAccessToken });
      } else {
        resetPersistentAuthData();
      }
    }

    return newAccessToken;
  } else {
    return accessToken;
  }
};

export const appendAuthorizationToken = (
  args: AxiosRequestConfig,
  accessToken: Nullable<string>
): AxiosRequestConfig => {
  return {
    ...args,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...args.headers,
    },
  };
};

export const axiosFetch = async (args: AxiosRequestConfig): AxiosPromise => {
  const accessToken = await getAccessToken();

  args = appendAuthorizationToken(args, accessToken);

  return axiosClient(args);
};
