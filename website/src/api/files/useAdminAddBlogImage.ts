import { FetchResource } from "@/types/api";
import { Image, ImageFile } from "@/types/general";
import { axiosFetch, getEndpoint } from "@/utils/api";
import { useQueryMutation } from "@/utils/useQueryMutation";

interface Args {
  image: ImageFile | Image;
}

export const useAdminAddBlogImage = (): {
  adminAddBlogImage: FetchResource<Args, Image>;
} => {
  return {
    adminAddBlogImage: useQueryMutation<Args, Image>({
      fetch: async ({ image }) => {
        if (image.src instanceof File) {
          const form = new FormData();
          form.append("upload", image.src);

          const response = await axiosFetch({
            method: "post",
            url: getEndpoint({ path: "/admin/images/blogs" }),
            data: form,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

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
