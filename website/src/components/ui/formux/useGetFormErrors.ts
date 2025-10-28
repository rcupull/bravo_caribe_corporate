import { useEffect, useState } from "react";

import { FormErrors } from "./types";

import { getIsValidPhone } from "./validation";
import {
  compact,
  get,
  getFlattenJson,
  isBoolean,
  isNullOrUndefinedOrEmptyString,
} from "@/utils/general";
import { AnyRecord, Nullable } from "@/types/general";
import { Path } from "@/types/paths";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validationsCallback = {
  required: (value: any): boolean => {
    if (value instanceof Array) {
      return value.length > 0;
    }
    return !isNullOrUndefinedOrEmptyString(value);
  },
  email: (value: string): boolean => {
    return emailRegex.test(value);
  },
  phone: (value: string): boolean => {
    return getIsValidPhone(value);
  },
  equal: (value1: any, value2: any): boolean => {
    return value1 === value2;
  },
};

export interface Validation<V extends AnyRecord, F extends Path<V> = Path<V>> {
  field: F;
  type: "required" | "email" | "equal" | "custom" | "phone";
  equalField?: F;
  customCb?: (fieldValue: any) => Promise<boolean> | boolean;
  message?: string;
}

export type FormValidations<
  V extends AnyRecord,
  F extends Path<V> = Path<V>
> = Array<Nullable<Validation<V, F>>>;

export type FormValidationsGetter<
  V extends AnyRecord,
  F extends Path<V> = Path<V>
> = (arg: { state: V }) => Array<Nullable<Validation<V, F>>>;

export type GetFormErrors<V extends AnyRecord, F extends Path<V> = Path<V>> = (
  value: V,
  validations: FormValidations<V, F>
) => Promise<FormErrors<V>>;

export const useGetFormErrors = <
  V extends AnyRecord,
  F extends Path<V> = Path<V>
>(args: {
  value: V;
  validations: FormValidations<V, F> | undefined;
}): {
  errors: FormErrors<V>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<V>>>;
} => {
  const { validations = [], value } = args;

  const [errors, setErrors] = useState<FormErrors<V>>({});

  const getErrorMessage = (validation: Validation<V, F>) => {
    const { type, message, equalField } = validation;

    if (message) return message;

    switch (type) {
      case "required":
        return "Campo requerido.";
      case "email":
        return "Email inválido.";
      case "phone":
        return "Teléfono inválido.";
      case "equal":
        if (!equalField) return "<unknown error>";
        return `El campo debe ser ${equalField.toString()}.`;
      case "custom":
        return `Campo inválido.`;
      default: {
        return "<unknown error>";
      }
    }
  };

  const handleValidate = async () => {
    const getValidationPromise = async (validation: Validation<V, F>) => {
      const { field, type, equalField, customCb } = validation;

      const errorMessage = getErrorMessage(validation);

      const fieldValue = get(value, field);

      const setFieldError = (fieldError: string | undefined) => {
        setErrors((errors) => {
          let newErrors = { ...errors, [field]: fieldError };
          newErrors = getFlattenJson(newErrors);

          return newErrors;
        });
      };

      if (type === "required" && !validationsCallback.required(fieldValue)) {
        return setFieldError(errorMessage);
      }

      if (type === "email" && !validationsCallback.email(fieldValue)) {
        return setFieldError(errorMessage);
      }

      if (type === "phone" && !validationsCallback.phone(fieldValue)) {
        return setFieldError(errorMessage);
      }

      if (type === "custom") {
        if (!customCb) {
          throw new Error("customCb is required for custom validation");
        }

        const response = customCb(fieldValue);

        if (response instanceof Promise) {
          return response.then((validated) => {
            setFieldError(validated ? undefined : errorMessage);
          });
        }

        if (isBoolean(response) && !response) {
          return setFieldError(errorMessage);
        }
      }

      if (type === "equal") {
        if (!equalField) {
          throw new Error("equalField is required for equal validation");
        }

        if (!validationsCallback.equal(fieldValue, get(value, equalField))) {
          return setFieldError(errorMessage);
        }
      }

      setFieldError(undefined);
    };

    const validationPromises = compact(validations).map(getValidationPromise);

    await Promise.all(validationPromises);
  };

  useEffect(() => {
    handleValidate();
  }, [JSON.stringify([value, validations])]);

  return {
    errors,
    setErrors,
  };
};
