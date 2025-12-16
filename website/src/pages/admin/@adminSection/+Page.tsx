import { useRouter } from "@/hooks/useRouter";
import { TabProducts } from "./components/tab-products";
import { AdminSection } from "../types";
import { TabBlogs } from "./components/tab-blog";
import { TabShoppings } from "./components/tab-shoppings";
import { AdminTabs } from "./components/admin-tabs";

export const Page = () => {
  const { params } = useRouter();

  const render = () => {
    const adminSection = params.adminSection;

    if (adminSection === AdminSection.PRODUCTS) {
      return <TabProducts />;
    }

    if (adminSection === AdminSection.BLOG) {
      return <TabBlogs />;
    }

    if (adminSection === AdminSection.ORDERS) {
      return <TabShoppings />;
    }

    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      <AdminTabs />
      {render()}
    </div>
  );
};
