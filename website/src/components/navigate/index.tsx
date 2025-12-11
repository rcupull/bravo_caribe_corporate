import { useRouter } from "@/hooks/useRouter";
import { Query } from "@/types/api";
import { useEffect } from "react";

interface NavigateProps {
  to: string;
  query?: Query;
  replace?: boolean;
}

export const Navigate = ({ to, query, replace }: NavigateProps) => {
  const { pushRoute } = useRouter();

  useEffect(() => {
    pushRoute(to, query, { replace });
  }, [to, JSON.stringify(query)]);

  return null;
};
