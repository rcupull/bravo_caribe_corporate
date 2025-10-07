import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import ProductDetail from "@/components/products/ProductDetail";
import QuickQuoteCTA from "@/components/products/QuickQuoteCTA";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/components/products/ProductCard";
import { toast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Datos dummy de productos automotrices
const allProducts: Product[] = [
  {
    id: "1",
    name: "Filtro de Aceite Premium",
    description:
      "Filtro de aceite de alta calidad compatible con múltiples modelos. Proporciona máxima protección para el motor y rendimiento óptimo.",
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
      "Pastillas de freno de alto rendimiento con tecnología cerámica. Menor ruido y polvo, mayor durabilidad.",
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
      "Kit completo de cadena y piñones para motocicletas deportivas. Incluye cadena reforzada y piñones de acero.",
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop",
    price: 156.0,
    inStock: false,
    category: "Motos",
    brand: "ChainPro",
  },
  {
    id: "4",
    name: "Batería de Alto Rendimiento",
    description:
      "Batería de 12V con tecnología AGM. Mayor vida útil y resistencia a vibraciones. Libre de mantenimiento.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop",
    price: 134.5,
    inStock: true,
    category: "Autos",
    brand: "PowerMax",
  },
  {
    id: "5",
    name: "Bujías de Iridio",
    description:
      "Set de 4 bujías de iridio de larga duración. Mejora el arranque y eficiencia del combustible.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    price: 45.99,
    inStock: true,
    category: "Autos",
    brand: "SparkTech",
  },
  {
    id: "6",
    name: "Amortiguadores Deportivos",
    description:
      "Par de amortiguadores de gas para mejor manejo y confort. Diseño deportivo con ajuste de dureza.",
    image:
      "https://images.unsplash.com/photo-1449130015084-2dc7c9e50a3a?w=800&h=600&fit=crop",
    price: 289.0,
    inStock: true,
    category: "Autos",
    brand: "SuspensionPro",
  },
  {
    id: "7",
    name: "Escape Deportivo para Moto",
    description:
      "Sistema de escape completo en acero inoxidable. Mejora el sonido y la potencia del motor.",
    image:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&h=600&fit=crop",
    price: 425.0,
    inStock: true,
    category: "Motos",
    brand: "ExhaustMaster",
  },
  {
    id: "8",
    name: "Kit de Embrague Heavy Duty",
    description:
      "Kit completo de embrague reforzado para vehículos pesados. Incluye disco, prensa y balero.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop",
    price: 385.0,
    inStock: true,
    category: "Vehículos Pesados",
    brand: "HeavyParts",
  },
  {
    id: "9",
    name: "Radiador de Aluminio",
    description:
      "Radiador de aluminio de alta eficiencia. Mayor capacidad de enfriamiento y durabilidad.",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop",
    price: 195.0,
    inStock: false,
    category: "Autos",
    brand: "CoolFlow",
  },
  {
    id: "10",
    name: "Neumáticos Todo Terreno",
    description:
      "Set de 4 neumáticos todo terreno con diseño agresivo. Excelente tracción en cualquier superficie.",
    image:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop",
    price: 560.0,
    inStock: true,
    category: "Autos",
    brand: "TirePro",
  },
  {
    id: "11",
    name: "Bomba de Combustible Eléctrica",
    description:
      "Bomba de combustible de alto flujo. Compatible con sistemas de inyección modernos.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    price: 125.0,
    inStock: true,
    category: "Autos",
    brand: "FuelTech",
  },
  {
    id: "12",
    name: "Manubrios de Aluminio Moto",
    description:
      "Manubrios deportivos de aluminio CNC. Ergonómicos y ligeros para mejor control.",
    image:
      "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop",
    price: 85.0,
    inStock: true,
    category: "Motos",
    brand: "HandlePro",
  },
];

const ITEMS_PER_PAGE = 9;

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { addToCart } = useCart();

  // Get unique categories
  const categories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  );

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (inStockOnly && !product.inStock) return false;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Producto agregado",
      description: `${product.name} se ha agregado al carrito`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary to-primary/80 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Catálogo de Productos
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl">
              Explora nuestra amplia selección de partes automotrices de alta
              calidad
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:col-span-1">
                <ProductFilters
                  categories={categories as string[]}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  inStockOnly={inStockOnly}
                  onInStockChange={setInStockOnly}
                />
              </aside>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    Mostrando {paginatedProducts.length} de{" "}
                    {filteredProducts.length} productos
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                    >
                      <ProductCard
                        product={product}
                        onQuoteRequest={() => handleAddToCart(product)}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </div>
          </div>
        </section>

        <QuickQuoteCTA />
      </main>

      <Footer />

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Products;
