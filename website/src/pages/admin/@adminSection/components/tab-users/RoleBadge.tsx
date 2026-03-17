import { useUpdateOneUser } from "@/api/user/useUpdateOneUser";
import { ButtonClose } from "@/components/button-close";
import { Button } from "@/components/ui/button";
import { useModal } from "@/features/modal/useModal";
import { useAuth } from "@/hooks/useAuth";
import { User, UserRole } from "@/types/auth";

interface RoleBadgeProps {
  rowData: User;
  onRefresh?: () => void;
}

export const RoleBadge = ({ rowData, onRefresh }: RoleBadgeProps) => {
  const { role } = rowData;
  const { pushModal } = useModal();
  const { user } = useAuth();

  const handleRemoveFromCart = (newRole: UserRole) => {
    pushModal({
      useProps: () => {
        const { onClose } = useModal();

        const { updateOneUser } = useUpdateOneUser();

        const isOwnUser = rowData._id === user?._id;

        return {
          title: "Confirmar",
          className: "!max-w-[30rem]",
          content: isOwnUser ? (
            <div>Usted no puede modificarse su propio role</div>
          ) : (
            <div>{`Seguro que desea cambiar el role de este usuario para ${newRole}?`}</div>
          ),
          closeButton: <ButtonClose />,
          primaryBtn: isOwnUser ? undefined : (
            <Button
              variant="default"
              onClick={() => {
                updateOneUser.fetch(
                  {
                    userId: rowData._id,
                    update: {
                      role: newRole,
                    },
                  },
                  {
                    onAfterSuccess: () => {
                      onRefresh?.();
                    },
                  },
                );
                onClose();
              }}
            >
              Cambiar
            </Button>
          ),
        };
      },
    });
  };

  return (
    <span
      onClick={() =>
        handleRemoveFromCart(
          role === UserRole.ADMIN ? UserRole.USER : UserRole.ADMIN,
        )
      }
      className={`cursor-pointer px-2 py-1 rounded-full text-xs font-medium ${
        role === UserRole.ADMIN
          ? "bg-yellow-100 text-yellow-800"
          : "bg-blue-100 text-blue-800"
      }`}
    >
      {role}
    </span>
  );
};
