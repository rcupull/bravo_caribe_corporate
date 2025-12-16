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

import { FileImage, Plus, RefreshCcw } from "lucide-react";

import { useAdminGetAllBlogs } from "@/api/blogs/useAdminGetAllBlogs";
import { useAddUpdateBlogModal } from "@/hooks/useAddUpdateBlogModal";
import { ImageComponent } from "@/components/image-component";
import { RowActions } from "./RowActions";

export const TabBlogs = () => {
  const { adminGetAllBlogs } = useAdminGetAllBlogs();
  const { addUpdateBlogModal } = useAddUpdateBlogModal();

  const onRefresh = () => adminGetAllBlogs.fetch();

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-foreground">Gestión de Blogs</h2>

        <div className="flex gap-2">
          <Button
            className="gap-2"
            onClick={() => {
              addUpdateBlogModal.open({ onRefresh });
            }}
          >
            <Plus className="h-4 w-4" />
            Nuevo Blog
          </Button>

          <Button variant="outline" className="gap-2" onClick={onRefresh}>
            <RefreshCcw className="h-4 w-4" />
            Actualizar
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cover</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Oculto</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminGetAllBlogs.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay blogs registrados
                </TableCell>
              </TableRow>
            ) : (
              adminGetAllBlogs.data?.map((rowData) => {
                const image = rowData.coverImage ? rowData.coverImage : null;

                return (
                  <TableRow key={rowData._id}>
                    <TableCell>
                      {image ? (
                        <ImageComponent
                          image={image}
                          className="w-16 object-cover rounded"
                        />
                      ) : (
                        <FileImage className="w-16 h-16 text-gray-300 object-cover rounded" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {rowData.title}
                      {rowData.featured && (
                        <span className="px-2 py-1 ml-6 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Destacado
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          rowData.hidden
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {rowData.hidden ? "Oculto" : "Visible"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <RowActions rowData={rowData} onRefresh={onRefresh} />
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
