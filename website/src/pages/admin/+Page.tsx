import { TabsUI } from "@/components/ui/tabs-ui";
import { Package, FileText } from "lucide-react";
import { TabProducts } from "./tab-products";
import { TabBlogs } from "./tab-blog";

export const Page = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Panel de Administración
        </h1>
        <p className="text-muted-foreground">
          Gestiona productos y contenido del blog
        </p>
      </div>

      <TabsUI
        items={[
          {
            value: "products",
            label: "Productos",
            svg: Package,
            content: <TabProducts />,
          },
          {
            value: "blog",
            label: "Blogs",
            svg: FileText,
            content: <TabBlogs />,
          },
        ]}
      />
    </>
  );
};
