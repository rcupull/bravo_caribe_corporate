import { useEffect, useRef, useState } from "react";

import { FormContext } from "./context";
import {
  FormContextState,
  FormErrorMode,
  FormTouched,
  FormuxProps,
} from "./types";
import { useGetFormErrors } from "./useGetFormErrors";
import { AnyRecord } from "@/types/general";
import {
  deepJsonCopy,
  getFlattenJson,
  isEmpty,
  isEqual,
  isFunction,
} from "@/utils/general";

export const Formux = <Value extends AnyRecord = AnyRecord>({
  validate: validateProp,
  children,
  onChange,
  value,
  onHasChange,
}: FormuxProps<Value>) => {
  const [formState, setFormState] = useState<Value>(value);
  //
  const [touched, setTouched] = useState<FormTouched<Value>>({});
  const [errorMode, setErrorMode] = useState<FormErrorMode>("touched");
  //
  const [initialValue, setIntialValue] = useState(deepJsonCopy(value));

  useEffect(() => {
    setFormState(value);
  }, [JSON.stringify(value)]);

  const validations = isFunction(validateProp)
    ? validateProp({ state: formState })
    : validateProp;

  const { errors, setErrors } = useGetFormErrors<Value>({
    validations,
    value: formState,
  });

  const isValid = isEmpty(getFlattenJson(errors));

  const getErrors = () => {
    if (errorMode === "all") {
      /**
       * Get errors for all fields
       */
      return errors;
    }

    if (errorMode === "touched") {
      /**
       * Only get errors for touched fields
       */
      return Object.keys(touched).reduce(
        (acc, key) => ({ ...acc, [key]: errors[key] }),
        {}
      );
    }

    /**
     * No return errors for undefined mode
     */
    return {};
  };

  /**
   * persistent value
   */
  const refValue = useRef<Value>(value);
  refValue.current = value;

  //////////////////////////////////////////////////////////////////////////////////////////

  const handleChangeState: React.Dispatch<React.SetStateAction<Value>> = (
    newState
  ) => {
    if (isFunction(newState)) {
      setFormState(newState);
      onChange?.(newState(formState), { errors });
    } else {
      setFormState(newState);
      onChange?.(newState, { errors });
    }
  };

  const hasChange = !isEqual(initialValue, formState);
  const refPrevHasChange = useRef(false);

  useEffect(() => {
    if (hasChange !== refPrevHasChange.current) {
      refPrevHasChange.current = hasChange;
      onHasChange?.(hasChange);
    }
  }, [hasChange]);

  const state: FormContextState<Value> = {
    value: formState,
    hasChange,
    isValid,
    errors: getErrors(),
    setErrors,
    setTouched,
    touched,
    setValue: handleChangeState,
    //
    setErrorMode,
    errorMode,
    //
    resetForm: () => {
      handleChangeState(initialValue);
      setErrors({});
      setTouched({});
    },
    refreshValue: () => {
      setIntialValue(deepJsonCopy(refValue.current));
    },
  };

  return (
    //@ts-expect-error ignore
    <FormContext.Provider value={state}>{children(state)}</FormContext.Provider>
  );
};
