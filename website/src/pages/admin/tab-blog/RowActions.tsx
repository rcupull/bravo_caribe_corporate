import { Button } from "@/components/ui/button";

import { Edit, Trash2 } from "lucide-react";
import { useAddUpdateBlogModal } from "@/hooks/useAddUpdateBlogModal";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { useAdminRemoveOneBlog } from "@/api/blogs/useAdminRemoveOneBlog";
import { toast } from "sonner";
import { Blog } from "@/types/blog";

interface RowActionsProps {
  rowData: Blog;
  onRefresh: () => void;
}

export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { addUpdateBlogModal } = useAddUpdateBlogModal();
  const { pushModal } = useModal();

  const { blogSlug } = rowData;

  const handleBlogDelete = () => {
    pushModal({
      useProps: () => {
        const { adminRemoveOneBlog } = useAdminRemoveOneBlog();
        const { onClose } = useModal();
        return {
          title: "Confirmar",
          content: <div>Seguro que desea eliminar este blog</div>,
          closeButton: <ButtonClose />,
          primaryBtn: (
            <Button
              onClick={() => {
                adminRemoveOneBlog.fetch(
                  { blogSlug },
                  {
                    onAfterSuccess: () => {
                      toast.success("Blog eliminado exitosamente");

                      onRefresh();
                      onClose();
                    },
                  }
                );
              }}
            >
              Eliminar
            </Button>
          ),
        };
      },
    });
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          addUpdateBlogModal.open({ onRefresh, blog: rowData });
        }}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          handleBlogDelete();
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
