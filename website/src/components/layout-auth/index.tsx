import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { ChildrenProp } from "@/types/general";

export const LayoutAuth = ({ children }: ChildrenProp) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-20">
        <div className="max-w-md mx-auto">{children}</div>
      </main>

      <Footer />
    </div>
  );
};
