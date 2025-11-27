import { addImageEndpointToValue } from "@/utils/ckeditor";
import { cn } from "@/utils/general";

export interface HtmlTextContainerProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {
  ckEditorData?: string | null;
}

export const HtmlTextContainer = ({
  className,
  ckEditorData,
  ...props
}: HtmlTextContainerProps) => {
  return (
    <div
      className={cn("ck-content no-preflight", className)}
      {...props}
      dangerouslySetInnerHTML={(() => {
        const __html = ckEditorData && addImageEndpointToValue(ckEditorData);

        return __html ? { __html } : undefined;
      })()}
    />
  );
};
