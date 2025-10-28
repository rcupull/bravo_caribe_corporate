import { ChildrenProp, StyleProps } from "@/types/general";
import { isFunction, isNumber } from "@/utils/general";
import { ReactNode, useState } from "react";
import { Popover } from "../popover";
import { PopoverProps } from "../popover";

export interface DropdownProps extends StyleProps, ChildrenProp, PopoverProps {
  contentFullWidth?: boolean;
}

export const Dropdown = ({ contentFullWidth, ...props }: DropdownProps) => {
  if (contentFullWidth) {
    return <DropdownFullWidth {...props} />;
  }

  return <DropdownStandar {...props} />;
};

const DropdownStandar = ({ children, ...props }: DropdownProps) => {
  return <Popover {...props}>{children}</Popover>;
};
const DropdownFullWidth = ({ children, content, ...props }: DropdownProps) => {
  const [width, setWidth] = useState<number>();

  const renderContent = (child: ReactNode) => (
    <div style={{ width }}>{child}</div>
  );

  return (
    <DropdownStandar
      content={
        isFunction(content)
          ? (args) => renderContent(content(args))
          : renderContent(content)
      }
      {...props}
    >
      <div
        className="w-full cursor-pointer"
        ref={(element) => {
          const newWidth = element?.offsetWidth;

          if (isNumber(newWidth) && newWidth !== width) {
            setWidth(newWidth);
          }
        }}
      >
        {children}
      </div>
    </DropdownStandar>
  );
};
