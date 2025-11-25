import { UseMutationResult } from "@tanstack/react-query";
import { ParsedQuery } from "query-string";
import { AnyRecord } from "./general";
import { AxiosRequestConfig } from "axios";

export type FetchData<Data = unknown> = Data | null;
export interface ApiError {
  message: string;
}

export type OnAfterSuccess<Data = any> = (
  reponse: Data
) => void | Promise<void>;

export type OnAfterFailed = (error: ApiError) => void;

export type FetchFnCallArgsGetter<T = any> = (args: T) => AxiosRequestConfig;

export type FetchOptions<Data = any> = {
  onAfterSuccess?: OnAfterSuccess<Data>;
  onAfterFailed?: OnAfterFailed;
};

export type FetchStatus = {
  loading: boolean;
};

export type UrlParams = AnyRecord;
export type Headers = Record<string, string | undefined>;
export type Query = ParsedQuery<string | number | boolean | undefined>;

export type GetEndpoint = (args: {
  path: string;
  query?: Query;
  urlParams?: UrlParams;
}) => string;

export interface Paginator {
  dataCount: number;
  offset: number;
  limit: number;
  pageCount: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number;
  nextPage?: number;
}

export interface PaginatedData<D extends AnyRecord = AnyRecord> {
  data: Array<D>;
  paginator: Paginator;
}

export type FetchResource<Args = void, Data = any> = UseMutationResult<
  FetchData<Data>,
  any,
  { fetchArgs: Args; options?: FetchOptions<Data> }
> & {
  fetch: (args: Args, options?: FetchOptions<Data>) => void;
};

export type FetchResourceWithPagination<
  Args = void,
  Data extends AnyRecord = AnyRecord
> = UseMutationResult<
  PaginatedData<Data>["data"] | null,
  any,
  { fetchArgs: Args; options?: FetchOptions<PaginatedData<Data>> }
> & {
  paginator?: PaginatedData<Data>["paginator"] | null;
  fetch: (args: Args, options?: FetchOptions<PaginatedData<Data>>) => void;
};

export type SliceApiPersistentState<D extends any = any> = {
  data: FetchData<D>;
  isPending: boolean;
} | null;
