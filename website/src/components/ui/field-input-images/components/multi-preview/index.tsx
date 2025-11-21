import { ImageElement } from "../../types";
import { getImageSrc } from "@/utils/image";
import { cn } from "@/utils/general";
import { ImageUp, Plus } from "lucide-react";

export interface MultiPreviewProps {
  images: Array<ImageElement>;
  selectedIndex: number;
  onClickOnImage?: (index: number) => void;
}

export const MultiPreview = ({
  images,
  selectedIndex,
  onClickOnImage,
}: MultiPreviewProps) => {
  return (
    <div className="flex items-center justify-start gap-2 mb-1 w-full overflow-x-auto">
      {images?.map((image, index) => {
        const selected = index === selectedIndex;

        const render = () => {
          if (image) {
            return (
              <img
                src={getImageSrc(image)}
                className="object-cover h-full w-full"
              />
            );
          }

          return (
            <div className="relative h-full w-full text-gray-500">
              <ImageUp key={index} className="h-full w-full" />
              <Plus className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600 font-bold" />
            </div>
          );
        };

        return (
          <div
            key={index}
            className={cn("size-10 cursor-pointer flex-shrink-0", {
              "border-gray-700 border-2 rounded-md p-0.5": selected,
              "border-gray-200 border-2 rounded-md p-0.5": !selected,
            })}
            onClick={() => onClickOnImage?.(index)}
          >
            {render()}
          </div>
        );
      })}
    </div>
  );
};
