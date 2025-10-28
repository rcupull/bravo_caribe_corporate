export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  endElement?: React.ReactNode;
  startElement?: React.ReactNode;
  //
  typeByRegex?: RegExp;
  //
  preventDefaultEnter?: boolean;
  inputClassName?: string;
}
