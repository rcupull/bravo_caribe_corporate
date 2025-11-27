import { Button } from "@/components/ui/button";

import { Formux } from "@/components/ui/formux";
import { FieldInput } from "@/components/ui/field-input";
import { useAdminAddOneBlog } from "@/api/blogs/useAdminAddOneBlog";
import { Image, ImageFile } from "@/types/general";
import { useAdminUpdateOneBlog } from "@/api/blogs/useAdminUpdateOneBlog";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { FieldInputImages } from "@/components/ui/field-input-images";
import { FieldCheckbox } from "@/components/ui/field-checkbox";
import { Blog } from "@/types/blog";
import { useAdminAddBlogImage } from "@/api/files/useAdminAddBlogImage";
import { FieldCheckEditor } from "@/components/ui/field-check-editor";
import { getEndpoint } from "@/utils/api";

interface ComponentProps {
  blog?: Blog;
  onRefresh: () => void;
}

interface State
  extends Pick<
    Blog,
    | "title"
    | "description"
    | "hidden"
    | "message"
    | "coverImage"
    | "author"
    | "featured"
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

            <FieldInput label="Autor" name="author" />

            <FieldInput label="Descripción" name="description" />

            <FieldCheckbox label="Oculto" name="hidden" />

            <FieldCheckbox label="Destacado" name="featured" />

            <FieldCheckEditor
              label="Texto"
              name="message"
              checkEditorProps={{
                className: "check-editor-min-h-50vh",
                uploadUrl: getEndpoint({
                  path: "/admin/images/blogs",
                }),
              }}
            />

            <FieldInputImages label="Cover" name="coverImage" />

            <div className="flex gap-2 justify-end">
              <ButtonClose>Cancelar</ButtonClose>
              <Button
                type="button"
                onClick={async () => {
                  const {
                    title,
                    coverImage,
                    description,
                    hidden,
                    message,
                    author,
                    featured,
                  } = value;

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
                          featured,
                          message,
                          author,
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
                        featured,
                        message,
                        author,
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
