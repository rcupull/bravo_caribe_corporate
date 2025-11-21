import React from "react";

import loadable from "@loadable/component";
import { Ellipsis } from "lucide-react";

type LoadableArgs = Parameters<typeof loadable>;

type LoadableFn = () => Promise<{ default: React.ComponentType<any> }>;
type LoadableOptions = NonNullable<LoadableArgs[1]>;

export type LoadableReturn = ReturnType<typeof loadable>;

export const dynamic = (
  fn: LoadableFn,
  fallback?: LoadableOptions["fallback"]
): LoadableReturn => {
  return loadable(fn, {
    fallback: fallback || <LazyLoadFallback />,
  });
};

const LazyLoadFallback = () => (
  <div className="flex justify-center items-center fixed inset-0 z-50">
    <Ellipsis />
  </div>
);
