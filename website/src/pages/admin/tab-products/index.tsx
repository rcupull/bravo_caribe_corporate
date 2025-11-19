import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Formux } from "@/components/ui/formux";
import { FieldInput } from "@/components/ui/field-input";
import { FieldSelect } from "@/components/ui/field-select";
import { categories } from "@/utils/category";
import { FieldTextArea } from "@/components/ui/field-text-area";
import { useAuth } from "@/hooks/useAuth";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  inStock: boolean;
  category: string;
  brand: string;
}

export const TabProducts = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form state
  const [productFormData, setProductFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    inStock: true,
    category: "",
    brand: "",
  });

  // Load products and blog posts from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      const initialProducts: Product[] = [
        {
          id: "1",
          name: "Filtro de Aceite Premium",
          description:
            "Filtro de aceite de alta calidad compatible con múltiples modelos",
          image:
            "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
          price: 24.99,
          inStock: true,
          category: "Autos",
          brand: "OEM Premium",
        },
        {
          id: "2",
          name: "Pastillas de Freno Cerámicas",
          description:
            "Pastillas de freno de alto rendimiento con tecnología cerámica",
          image:
            "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop",
          price: 89.99,
          inStock: true,
          category: "Autos",
          brand: "BrakeTech",
        },
        {
          id: "3",
          name: "Kit de Cadena para Moto",
          description:
            "Kit completo de cadena y piñones para motocicletas deportivas",
          image:
            "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop",
          price: 156.0,
          inStock: false,
          category: "Motos",
          brand: "ChainPro",
        },
      ];
      setProducts(initialProducts);
      localStorage.setItem("products", JSON.stringify(initialProducts));
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Product handlers
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...editingProduct,
              ...productFormData,
              price: parseFloat(productFormData.price),
            }
          : p
      );
      saveProducts(updatedProducts);
      toast.success("Producto actualizado exitosamente");
    } else {
      const newProduct: Product = {
        id: crypto.randomUUID(),
        ...productFormData,
        price: parseFloat(productFormData.price),
      };
      saveProducts([...products, newProduct]);
      toast.success("Producto creado exitosamente");
    }

    resetProductForm();
    setIsProductDialogOpen(false);
  };

  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price.toString(),
      inStock: product.inStock,
      category: product.category,
      brand: product.brand,
    });
    setIsProductDialogOpen(true);
  };

  const handleProductDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      const updatedProducts = products.filter((p) => p.id !== id);
      saveProducts(updatedProducts);
      toast.success("Producto eliminado exitosamente");
    }
  };

  const resetProductForm = () => {
    setProductFormData({
      name: "",
      description: "",
      image: "",
      price: "",
      inStock: true,
      category: "",
      brand: "",
    });
    setEditingProduct(null);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Productos
        </h2>
        <Dialog
          open={isProductDialogOpen}
          onOpenChange={(open) => {
            setIsProductDialogOpen(open);
            if (!open) resetProductForm();
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Modifica los datos del producto"
                  : "Completa el formulario para agregar un nuevo producto"}
              </DialogDescription>
            </DialogHeader>
            <Formux value={{}}>
              {() => {
                return (
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <FieldInput label="Nombre del Producto" name="name" />

                    <FieldTextArea label="Descripción" name="description" />

                    <div className="grid grid-cols-2 gap-4">
                      <FieldInput label="Marca" name="brand" />

                      <FieldSelect
                        items={categories}
                        label="Categoría"
                        renderOption={({ name }) => name}
                        renderValue={({ name }) => name}
                        optionToValue={({ type }) => type}
                        name="category"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FieldInput label="Precio" name="price" type="number" />

                      <FieldSelect<{ value: boolean; label: string }>
                        items={[
                          {
                            label: "En Stock",
                            value: true,
                          },
                          {
                            label: "Agotado",
                            value: false,
                          },
                        ]}
                        label="Disponibilidad"
                        renderOption={({ label }) => label}
                        renderValue={({ label }) => label}
                        optionToValue={({ value }) => value}
                        name="inStock"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">URL de Imagen</Label>
                      <Input
                        id="image"
                        type="url"
                        value={productFormData.image}
                        onChange={(e) =>
                          setProductFormData({
                            ...productFormData,
                            image: e.target.value,
                          })
                        }
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsProductDialogOpen(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">
                        {editingProduct ? "Actualizar" : "Crear"} Producto
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formux>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No hay productos registrados
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.inStock ? "En Stock" : "Agotado"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleProductEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleProductDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
