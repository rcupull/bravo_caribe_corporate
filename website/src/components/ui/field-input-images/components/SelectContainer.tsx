import { ChildrenProp, StyleProps } from "@/types/general";
import { cn } from "@/utils/general";
import { FunctionComponent } from "react";

export interface SelectContainerProps extends ChildrenProp {
  svg: FunctionComponent<StyleProps>;
  onClick: () => void;
}

export const SelectContainer = ({
  children,
  svg: Svg,
  onClick,
}: SelectContainerProps) => {
  return (
    <span
      className={cn(
        "relative cursor-pointer rounded-md bg-white font-semibold text-gray-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-500"
      )}
      onClick={onClick}
    >
      <Svg className="text-gray-400 size-7 inline mr-1 my-0.5" />
      {children}
    </span>
  );
};
