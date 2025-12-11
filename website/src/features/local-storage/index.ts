import { isSSR } from "@/utils/ssr";

const save = <T = any>(field: string, value: T) => {
  localStorage.setItem(field, JSON.stringify(value));
};

const read = <T = any>(field: string): T | null => {
  const value = localStorage.getItem(field);
  return value ? JSON.parse(value) : null;
};

const remove = (field: string) => {
  localStorage.removeItem(field);
};

const reset = () => {
  localStorage.clear();
};

export const localStorageUtils = () => {
  const enabled = !isSSR();

  return {
    saveLS: enabled ? save : () => {},
    readLS: enabled ? read : () => null,
    removeLS: enabled ? remove : () => {},
    resetLS: enabled ? reset : () => {},
  };
};
