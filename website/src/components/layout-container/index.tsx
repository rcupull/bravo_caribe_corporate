import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { ChildrenProp } from "@/types/general";

export const LayoutContainer = ({ children }: ChildrenProp) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">{children}</div>
      </main>

      <Footer />
    </div>
  );
};
