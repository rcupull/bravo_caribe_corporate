import { cn } from "@/utils/general";

export const Spinner = ({ className }) => (
  <div
    className={cn(
      "animate-spin rounded-full border-4 border-muted border-t-accent",
      className
    )}
  />
);
