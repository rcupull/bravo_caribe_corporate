import { usePageContext } from "@/hooks/usePageContext";
import { FetchResource } from "@/types/api";
import { Image, ImageFile } from "@/types/general";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  image: ImageFile | Image;
}

export const useAdminAddProductImage = (): {
  adminAddProductImage: FetchResource<Args, Image>;
} => {
  const pageContext = usePageContext();
  return {
    adminAddProductImage: useQueryMutation<Args, Image>({
      fetch: async ({ image }) => {
        if (image.src instanceof File) {
          const form = new FormData();
          form.append("upload", image.src);

          const response = await axiosFetch(
            {
              method: "post",
              url: getEndpoint({ path: "/admin/images/products" }),
              data: form,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
            pageContext
          );

          return {
            ...image,
            src: response.data.imageSrc,
          };
        } else {
          return image;
        }
      },
    }),
  };
};
