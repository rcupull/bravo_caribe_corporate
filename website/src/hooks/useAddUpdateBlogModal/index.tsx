import { Blog } from "@/types/blog";
import { useModalPage } from "../useModalPage";
import { dynamic } from "@/utils/makeLazy";

//eslint-disable-next-line
const Component = dynamic(() => import("./Component").then((m) => m));

export const useAddUpdateBlogModal = () => {
  return {
    addUpdateBlogModal: useModalPage<{
      blog?: Blog;
      onRefresh: () => void;
    }>(({ onRefresh, blog }) => ({
      useProps: () => {
        return {
          title: blog ? "Editar Blog" : "Nuevo Blog",
          description: blog
            ? "Modifica los datos del blog"
            : "Completa el formulario para agregar un nuevo blog",
          content: <Component blog={blog} onRefresh={onRefresh} />,
        };
      },
    })),
  };
};
