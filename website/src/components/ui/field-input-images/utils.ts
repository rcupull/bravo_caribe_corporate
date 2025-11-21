import { compact, getFlattenArray } from "@/utils/general";
import { State } from "./types";

export const addOneEmptyPreview = (s: State): State => {
  return [...s, undefined];
};

export const removeEmptyPreview = (s: State): State => {
  return compact(s);
};

export const getFlattenState = (newState: State): State => {
  return getFlattenArray(newState, (val) => !!val?.src);
};
