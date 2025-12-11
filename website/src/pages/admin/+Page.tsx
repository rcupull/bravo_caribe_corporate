import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TabsUI } from "@/components/ui/tabs-ui";
import { Package, FileText } from "lucide-react";
import { TabProducts } from "./tab-products";
import { TabBlogs } from "./tab-blog";

export const Page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-secondary py-12">
        <div className="container mx-auto px-4">
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
        </div>
      </main>

      <Footer />
    </div>
  );
};
