import { Query } from "@/types/api";
import { AnyRecord } from "@/types/general";

export interface Params {
  code?: string;
  blogSlug?: string;
  adminSection?: string;
}

export interface UseRouterReturn<Q extends Query = Query> {
  pushRoute: (
    route: string,
    query?: AnyRecord,
    options?: {
      timeout?: number;
      replace?: boolean;
    }
  ) => void;
  onBack: () => void;
  queryToSearch: (query: Q) => void;
  pathname: string;
  query: Q;
  params: Params;
  onChangeQuery: (
    partialQuery: Partial<Q>,
    options?: {
      timeout?: number;
      replaceAll?: boolean;
      replaceLastHistoryEntry?: boolean;
    }
  ) => void;
}
