import { FormContextState } from "../formux/types";
import { useForm } from "../formux/useForm";

export interface FormuxDataContainerProps {
  children: (args: FormContextState) => React.ReactNode;
}
export const FormuxDataContainer = ({ children }: FormuxDataContainerProps) => {
  const formState = useForm();

  return <>{children(formState)}</>;
};
