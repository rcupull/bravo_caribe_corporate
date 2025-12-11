import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { ChildrenProp } from "@/types/general";

export const MainLayout = ({ children }: ChildrenProp) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-secondary py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
