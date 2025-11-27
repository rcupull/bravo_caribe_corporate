import { Button } from "@/components/ui/button";

import { Formux } from "@/components/ui/formux";
import { FieldInput } from "@/components/ui/field-input";
import { FieldSelect } from "@/components/ui/field-select";
import { categories } from "@/utils/category";
import { useAdminAddOneBlog } from "@/api/blogs/useAdminAddOneBlog";
import { Currency, Image, ImageFile } from "@/types/general";
import { useAdminUpdateOneBlog } from "@/api/blogs/useAdminUpdateOneBlog";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { FieldInputImages } from "@/components/ui/field-input-images";
import { FieldCheckbox } from "@/components/ui/field-checkbox";
import { Blog } from "@/types/blog";
import { useAdminAddBlogImage } from "@/api/files/useAdminAddBlogImage";
import { FieldTextArea } from "@/components/ui/field-text-area";

interface ComponentProps {
  blog?: Blog;
  onRefresh: () => void;
}

interface State
  extends Pick<
    Blog,
    "title" | "description" | "hidden" | "message" | "coverImage"
  > {}

const Component = ({ blog, onRefresh }: ComponentProps) => {
  const { adminAddOneBlog } = useAdminAddOneBlog();
  const { adminUpdateOneBlog } = useAdminUpdateOneBlog();
  const { adminAddBlogImage } = useAdminAddBlogImage();

  const uploadImage = async (image: Image | ImageFile): Promise<Image> => {
    return new Promise((resolve, rejected) => {
      adminAddBlogImage.fetch(
        {
          image,
        },
        {
          onAfterSuccess: (data) => {
            resolve(data);
          },
          onAfterFailed: () => {
            rejected();
          },
        }
      );
    });
  };

  const { onClose } = useModal();

  return (
    <Formux<State>
      value={{
        title: "",
        description: "",
        coverImage: undefined,
        hidden: false,
        message: "",
        ...(blog || {}),
      }}
    >
      {({ value }) => {
        return (
          <form className="space-y-4">
            <FieldInput label="Título" name="title" />

            <FieldInput label="Descripción" name="description" />

            <FieldCheckbox label="Oculto" name="hidden" />

            <FieldTextArea label="Texto" name="message" />

            <FieldInputImages label="Cover" name="coverImage" />

            <div className="flex gap-2 justify-end">
              <ButtonClose>Cancelar</ButtonClose>
              <Button
                type="button"
                onClick={async () => {
                  const { title, coverImage, description, hidden, message } =
                    value;

                  const imageToUpload = coverImage
                    ? await uploadImage(coverImage)
                    : undefined;

                  if (blog) {
                    adminUpdateOneBlog.fetch(
                      {
                        blogSlug: blog.blogSlug,
                        update: {
                          title,
                          coverImage: imageToUpload,
                          description,
                          hidden,
                          message,
                        },
                      },
                      {
                        onAfterSuccess: () => {
                          onRefresh();
                          onClose();
                        },
                      }
                    );
                  } else {
                    adminAddOneBlog.fetch(
                      {
                        title,
                        coverImage: imageToUpload,
                        description,
                        hidden,
                        message,
                      },
                      {
                        onAfterSuccess: () => {
                          onRefresh();
                          onClose();
                        },
                      }
                    );
                  }
                }}
              >
                {blog ? "Actualizar" : "Crear"} Blog
              </Button>
            </div>
          </form>
        );
      }}
    </Formux>
  );
};

export default Component;
