import { ChildrenProp, StyleProps } from "@/types/general";

export interface LinkProps extends ChildrenProp, StyleProps {
  to: string;
  onClick?: () => void;
}
export const Link = ({ to, children, className, onClick }: LinkProps) => {
  return (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  );
};
