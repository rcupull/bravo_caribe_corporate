import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Plus, Edit, Trash2, Package, FileText } from "lucide-react";

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

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
}

const Admin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isBlogDialogOpen, setIsBlogDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);

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

  // Blog Form state
  const [blogFormData, setBlogFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "",
    date: "",
    category: "",
    featured: false,
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

    const storedBlogPosts = localStorage.getItem("blogPosts");
    if (storedBlogPosts) {
      setBlogPosts(JSON.parse(storedBlogPosts));
    } else {
      const initialPosts: BlogPost[] = [
        {
          id: "1",
          title: "Guía Completa de Mantenimiento Preventivo",
          excerpt:
            "Descubre cómo el mantenimiento preventivo puede extender la vida útil de tu vehículo y ahorrarte dinero.",
          content:
            "El mantenimiento preventivo es clave para mantener tu vehículo en óptimas condiciones...",
          image:
            "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
          author: "Carlos Mendoza",
          date: "2024-01-15",
          category: "Mantenimiento",
          featured: true,
        },
      ];
      setBlogPosts(initialPosts);
      localStorage.setItem("blogPosts", JSON.stringify(initialPosts));
    }
  }, []);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para acceder");
      navigate("/auth");
    } else if (!isAdmin) {
      toast.error("No tienes permisos de administrador");
      navigate("/");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const saveBlogPosts = (updatedPosts: BlogPost[]) => {
    setBlogPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
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

  // Blog handlers
  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingBlogPost) {
      const updatedPosts = blogPosts.map((p) =>
        p.id === editingBlogPost.id
          ? {
              ...editingBlogPost,
              ...blogFormData,
            }
          : p
      );
      saveBlogPosts(updatedPosts);
      toast.success("Artículo actualizado exitosamente");
    } else {
      const newPost: BlogPost = {
        id: crypto.randomUUID(),
        ...blogFormData,
      };
      saveBlogPosts([...blogPosts, newPost]);
      toast.success("Artículo creado exitosamente");
    }

    resetBlogForm();
    setIsBlogDialogOpen(false);
  };

  const handleBlogEdit = (post: BlogPost) => {
    setEditingBlogPost(post);
    setBlogFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      date: post.date,
      category: post.category,
      featured: post.featured,
    });
    setIsBlogDialogOpen(true);
  };

  const handleBlogDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este artículo?")) {
      const updatedPosts = blogPosts.filter((p) => p.id !== id);
      saveBlogPosts(updatedPosts);
      toast.success("Artículo eliminado exitosamente");
    }
  };

  const resetBlogForm = () => {
    setBlogFormData({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "",
      date: "",
      category: "",
      featured: false,
    });
    setEditingBlogPost(null);
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Panel de Administración
            </h1>
            <p className="text-muted-foreground">
              Gestiona productos y contenido del blog
            </p>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products" className="gap-2">
                <Package className="h-4 w-4" />
                Productos
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-2">
                <FileText className="h-4 w-4" />
                Blog
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
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
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre del Producto</Label>
                        <Input
                          id="name"
                          value={productFormData.name}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                          id="description"
                          value={productFormData.description}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              description: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="brand">Marca</Label>
                          <Input
                            id="brand"
                            value={productFormData.brand}
                            onChange={(e) =>
                              setProductFormData({
                                ...productFormData,
                                brand: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Categoría</Label>
                          <Input
                            id="category"
                            value={productFormData.category}
                            onChange={(e) =>
                              setProductFormData({
                                ...productFormData,
                                category: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Precio ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={productFormData.price}
                            onChange={(e) =>
                              setProductFormData({
                                ...productFormData,
                                price: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inStock">Disponibilidad</Label>
                          <select
                            id="inStock"
                            value={productFormData.inStock.toString()}
                            onChange={(e) =>
                              setProductFormData({
                                ...productFormData,
                                inStock: e.target.value === "true",
                              })
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="true">En Stock</option>
                            <option value="false">Agotado</option>
                          </select>
                        </div>
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
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
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
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Gestión del Blog
                </h2>
                <Dialog
                  open={isBlogDialogOpen}
                  onOpenChange={(open) => {
                    setIsBlogDialogOpen(open);
                    if (!open) resetBlogForm();
                  }}
                >
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Nuevo Artículo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {editingBlogPost ? "Editar Artículo" : "Nuevo Artículo"}
                      </DialogTitle>
                      <DialogDescription>
                        {editingBlogPost
                          ? "Modifica los datos del artículo"
                          : "Completa el formulario para agregar un nuevo artículo"}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                          id="title"
                          value={blogFormData.title}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
                              title: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Extracto</Label>
                        <Textarea
                          id="excerpt"
                          value={blogFormData.excerpt}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
                              excerpt: e.target.value,
                            })
                          }
                          placeholder="Breve descripción del artículo"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content">Contenido</Label>
                        <Textarea
                          id="content"
                          value={blogFormData.content}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
                              content: e.target.value,
                            })
                          }
                          placeholder="Contenido completo del artículo"
                          rows={6}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="author">Autor</Label>
                          <Input
                            id="author"
                            value={blogFormData.author}
                            onChange={(e) =>
                              setBlogFormData({
                                ...blogFormData,
                                author: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date">Fecha</Label>
                          <Input
                            id="date"
                            type="date"
                            value={blogFormData.date}
                            onChange={(e) =>
                              setBlogFormData({
                                ...blogFormData,
                                date: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="blog-category">Categoría</Label>
                          <Input
                            id="blog-category"
                            value={blogFormData.category}
                            onChange={(e) =>
                              setBlogFormData({
                                ...blogFormData,
                                category: e.target.value,
                              })
                            }
                            placeholder="Ej: Mantenimiento, Frenos"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="featured">Destacado</Label>
                          <select
                            id="featured"
                            value={blogFormData.featured.toString()}
                            onChange={(e) =>
                              setBlogFormData({
                                ...blogFormData,
                                featured: e.target.value === "true",
                              })
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <option value="false">No</option>
                            <option value="true">Sí</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="blog-image">URL de Imagen</Label>
                        <Input
                          id="blog-image"
                          type="url"
                          value={blogFormData.image}
                          onChange={(e) =>
                            setBlogFormData({
                              ...blogFormData,
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
                          onClick={() => setIsBlogDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button type="submit">
                          {editingBlogPost ? "Actualizar" : "Crear"} Artículo
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="bg-card rounded-lg shadow-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagen</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Autor</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Destacado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogPosts.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-muted-foreground"
                        >
                          No hay artículos registrados
                        </TableCell>
                      </TableRow>
                    ) : (
                      blogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell className="font-medium max-w-xs truncate">
                            {post.title}
                          </TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            {new Date(post.date).toLocaleDateString("es-ES")}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                post.featured
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {post.featured ? "Sí" : "No"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBlogEdit(post)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleBlogDelete(post.id)}
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
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
