import { Image, ImageFile } from "@/types/general";
import { getFileImageSize } from "./file";
import { getImageEndpoint } from "./api";

export const getImageSrc = (image: Image | ImageFile): string => {
  const imageSrc = image.src;

  if (imageSrc instanceof File) {
    return URL.createObjectURL(imageSrc);
  }

  if (typeof imageSrc === "string") {
    if (imageSrc.startsWith("blob")) {
      return imageSrc;
    }

    return getImageEndpoint(imageSrc);
  }

  return "";
};

// export const getImageBlobSrc = async (
//   image: Image | ImageFile
// ): Promise<string> => {
//   if (image.src instanceof File) {
//     return URL.createObjectURL(image.src);
//   }

//   if (typeof image.src === "string") {
//     const imageEndpoint = getImageEndpoint(image.src);

//     const response = await fetch(imageEndpoint);
//     const blob = await response.blob();
//     const file = blobToFile(blob, "copied.png");
//     return URL.createObjectURL(file);
//   }

//   return "";
// };

export const getImageRowData = async (
  image: File | Image
): Promise<Image | ImageFile> => {
  if (image instanceof File) {
    return {
      src: image,
      ...(await getFileImageSize(image)),
    };
  }

  return image;
};
