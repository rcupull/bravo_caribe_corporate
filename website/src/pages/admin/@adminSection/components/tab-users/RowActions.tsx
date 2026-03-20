import { Button } from "@/components/ui/button";

import { Trash2 } from "lucide-react";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { toast } from "sonner";
import { User } from "@/types/auth";
import { useRemoveOneUser } from "@/api/user/useRemoveOneUser";
import { useAuth } from "@/hooks/useAuth";

interface RowActionsProps {
  rowData: User;
  onRefresh: () => void;
}

export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { pushModal } = useModal();

  const { user } = useAuth();

  const handleRemove = () => {
    pushModal({
      useProps: () => {
        const { removeOneUser } = useRemoveOneUser();
        const { onClose } = useModal();
        return {
          title: "Confirmar",
          content: <div>Segiro que deseas eliminar este usuario</div>,
          closeButton: <ButtonClose />,
          primaryBtn: (
            <Button
              onClick={() => {
                removeOneUser.fetch(
                  { userId: rowData._id },
                  {
                    onAfterSuccess: () => {
                      toast.success("Usuario eliminado exitosamente");

                      onRefresh();
                      onClose();
                    },
                  },
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
        variant="destructive"
        disabled={user?._id === rowData._id}
        onClick={() => {
          handleRemove();
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
