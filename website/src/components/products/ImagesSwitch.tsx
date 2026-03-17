import { useInterval } from "@/hooks/useInterval";
import { Image, StyleProps } from "@/types/general";
import { cn, getRandomNumber } from "@/utils/general";
import { useEffect, useState } from "react";
import { ImageComponent } from "../image-component";

export interface ImagesSwitchProps extends StyleProps {
  images?: Array<Image>;
}

export const ImagesSwitch = ({ images, className }: ImagesSwitchProps) => {
  const [switchImageIndex, setSwitchImageIndex] = useState<number>(0);

  const interval = useInterval();

  useEffect(() => {
    if (images?.length) {
      if (images.length > 1) {
        interval(
          images.map((_, index) => () => setSwitchImageIndex(index)),
          getRandomNumber(3000, 5000),
        );

        return interval.cancel;
      }
    }
  }, [images?.length]);

  return (
    <>
      {images?.map((image, index) => {
        return (
          <ImageComponent
            key={index}
            image={image}
            className={cn(className, {
              hidden: index !== switchImageIndex,
            })}
          />
        );
      })}
    </>
  );
};
