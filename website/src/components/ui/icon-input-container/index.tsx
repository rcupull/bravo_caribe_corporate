import { StyleProps } from "@/types/general";
import { FunctionComponent } from "react";

export interface IconInputContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  svg: FunctionComponent<StyleProps>;
}
export const IconInputContainer = ({
  svg: SvgComponent,
  ...props
}: IconInputContainerProps) => {
  return (
    <div {...props}>
      <SvgComponent className="size-6 text-gray-400 cursor-pointer mx-4" />
    </div>
  );
};
