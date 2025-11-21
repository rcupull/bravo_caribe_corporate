import { useEffect, useState } from "react";
import { ModalComponent } from "./ModalComponent";
import { ModalProps } from "./types";
import { useDebouncer } from "@/hooks/useDebouncer";

export const Modal = (props: ModalProps) => {
  const [open, setOpen] = useState(false);
  const openDebouncer = useDebouncer();

  useEffect(() => {
    openDebouncer(() => setOpen(true), 100);
  }, []);

  return <ModalComponent {...props} open={open} />;
};
