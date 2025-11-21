import { ChildrenProp, StyleProps } from "@/types/general";
import { cn } from "@/utils/general";

export interface DragAndDropFilesProps extends ChildrenProp, StyleProps {
  onChange?: (images: Array<File>) => void;
  error?: boolean;
}

export const DragAndDropFiles = ({
  onChange,
  children,
  error,
  className,
}: DragAndDropFilesProps) => {
  return (
    <div
      className={cn(
        "min-h-80 border-2 border-dashed border-gray-900/25 rounded-lg hover:border-gray-900/80",
        {
          "ring-1 rounded-md ring-red-500 focus:ring-red-500": error,
        },
        className
      )}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        const fileArray: Array<File> = Array.from(event.dataTransfer.files);
        onChange?.(fileArray);
      }}
    >
      {children}
    </div>
  );
};
