import { Package, FileText, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/hooks/useRouter";
import { AdminSection } from "@/pages/admin/types";
import { FunctionComponent } from "react";
import { StyleProps } from "@/types/general";

export const AdminTabs = () => {
  const { pushRoute, params } = useRouter();

  const adminSection = params.adminSection;

  const items: Array<{
    value: AdminSection;
    label: string;
    svg: FunctionComponent<StyleProps>;
  }> = [
    {
      value: AdminSection.PRODUCTS,
      label: "Productos",
      svg: Package,
    },
    {
      value: AdminSection.BLOG,
      label: "Blogs",
      svg: FileText,
    },
    {
      value: AdminSection.ORDERS,
      label: "Ordenes",
      svg: ShoppingBag,
    },
  ];
  return (
    <div className="flex gap-2">
      {items.map(({ label, value }, index) => {
        const selected = adminSection === value;
        return (
          <Button
            key={index}
            onClick={() => {
              pushRoute(`/admin/${value}`);
            }}
            variant={selected ? "default" : "outline"}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};
