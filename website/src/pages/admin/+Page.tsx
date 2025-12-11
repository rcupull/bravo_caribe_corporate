import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TabsUI } from "@/components/ui/tabs-ui";
import { Package, FileText } from "lucide-react";
import { TabProducts } from "./tab-products";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { TabBlogs } from "./tab-blog";
import { useRouter } from "@/hooks/useRouter";

export const Page = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { pushRoute } = useRouter();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para acceder");
      pushRoute("/iniciar-sesion");
    } else if (!isAdmin) {
      toast.error("No tienes permisos de administrador");
      pushRoute("/");
    }
  }, [isAuthenticated, isAdmin]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

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
