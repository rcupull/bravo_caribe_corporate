import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FileImage, RefreshCcw } from "lucide-react";

import { ImageComponent } from "@/components/image-component";
import { useAdminGetAllUsers } from "@/api/user/useAdminGetAllUsers";
import { UserRole } from "@/types/auth";

export const TabUsers = () => {
  const { adminGetAllUsers } = useAdminGetAllUsers();

  const onRefresh = () => adminGetAllUsers.fetch({});

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Usuarios
        </h2>

        <Button variant="outline" className="gap-2" onClick={onRefresh}>
          <RefreshCcw className="h-4 w-4" />
          Actualizar
        </Button>
      </div>

      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Registro</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {adminGetAllUsers.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay usuarios registrados
                </TableCell>
              </TableRow>
            ) : (
              adminGetAllUsers.data?.map((user) => {
                const {
                  _id,
                  validated,
                  profileImage,
                  createdAt,
                  name,
                  email,
                  role,
                } = user;

                return (
                  <TableRow key={_id}>
                    {/* Avatar */}
                    <TableCell>
                      {profileImage ? (
                        <ImageComponent
                          image={profileImage}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                      ) : (
                        <FileImage className="w-12 h-12 text-muted-foreground" />
                      )}
                    </TableCell>

                    {/* Nombre + Email */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{name}</span>
                        <span className="text-sm text-muted-foreground">
                          {email}
                        </span>
                      </div>
                    </TableCell>

                    {/* Rol */}
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          role === UserRole.ADMIN
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {role}
                      </span>
                    </TableCell>

                    {/* Estado de validación */}
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          validated
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {validated ? "Validado" : "Pendiente"}
                      </span>
                    </TableCell>

                    {/* Fecha */}
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
