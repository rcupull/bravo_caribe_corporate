import { Image, ImageFile } from "@/types/general";
import { getImageSrc } from "@/utils/image";

export interface ImageComponentProps
  extends React.HtmlHTMLAttributes<HTMLImageElement> {
  image: Image | ImageFile;
  disabledBlur?: boolean;
}

export const ImageComponent = ({
  image,
  disabledBlur,
  ...props
}: ImageComponentProps) => {
  const src = getImageSrc(image);

  return <img alt={image.alt} src={src} {...props} />;
};
