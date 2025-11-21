import { useContext } from "react";

import { FormContext } from "./context";
import { FormContextState } from "./types";
import { AnyRecord } from "@/types/general";

export const useForm = <T extends AnyRecord = AnyRecord>() => {
  return useContext<FormContextState<T>>(FormContext as any);
};
