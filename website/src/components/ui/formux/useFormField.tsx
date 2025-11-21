import { deepJsonCopy, get, set } from "@/utils/general";
import { useForm } from "./useForm";

interface ChangeEvent {
  target: {
    name?: string;
    value: any;
  };
}

export interface FormField<Value = any> {
  value?: Value;
  name?: string;
  onClick: () => void;
  onChange: (...args: Array<ChangeEvent>) => void;
}

//eslint-disable-next-line
export const useFormField = <Value extends any = any>(args: {
  name?: string;
}): {
  error?: string;
  getNestedFieldName: (fieldName: string) => string;
  setError: (error: string) => void;
  field: FormField<Value>;
} => {
  const { name } = args;
  const { setValue, value, errors, setTouched, setErrors } = useForm();

  return {
    getNestedFieldName: (fieldName) => `${name}.${fieldName.toString()}`,
    error: name ? errors[name] : undefined,
    setError: (error) => {
      if (!name) return;

      setErrors((errors) => {
        const newErrors = deepJsonCopy(errors);
        newErrors[name] = error;
        return newErrors;
      });
    },
    field: {
      value: name ? get(value, name) : undefined,
      name,

      onChange: (...events) => {
        setValue((state) => {
          const newState = deepJsonCopy(state);

          events.forEach((e) => {
            if (e.target.name) {
              set(newState, e.target.name, e.target.value);
            }
          });

          return newState;
        });
      },
      onClick: () => {
        if (!name) return;

        setTouched((touched) => ({ ...touched, [name]: true }));
      },
    },
  };
};
