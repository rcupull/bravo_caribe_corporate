import { getImageEndpoint } from "./api";
import { compact, replaceAll } from "./general";

export const ckEditorEndpointReplacement = "imageUrlEndpoint";

export const getImagesSrcFromValue = (data: string) => {
  const out = Array.from(
    new DOMParser().parseFromString(data, "text/html").querySelectorAll("img")
  ).map((img) => img.getAttribute("src"));

  return compact(out);
};

export const getImagesToRemove = (args: {
  newData: string;
  currentData?: string;
  exclude?: string;
}) => {
  const { newData, exclude = "", currentData = "" } = args;
  const out: Array<string> = [];
  const newSrcs = getImagesSrcFromValue(newData);
  const currentDataSrcs = getImagesSrcFromValue(currentData);
  const excludeSrcs = getImagesSrcFromValue(exclude);

  currentDataSrcs.forEach((src) => {
    if (newSrcs.includes(src)) return;
    if (excludeSrcs.includes(src)) return;

    out.push(src);
  });

  return out;
};

export const addImageEndpointToValue = (value: string | undefined) => {
  return (
    value && replaceAll(value, ckEditorEndpointReplacement, getImageEndpoint())
  );
};

export const removeImageEndpointFromValue = (value: string | undefined) => {
  return (
    value && replaceAll(value, getImageEndpoint(), ckEditorEndpointReplacement)
  );
};
