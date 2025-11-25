import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import ProductDetail from "@/components/products/ProductDetail";
import QuickQuoteCTA from "@/components/products/QuickQuoteCTA";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetAllProducts } from "@/api/products/useGetAllProducts";
import { Product } from "@/types/products";
import { CategoryType } from "@/types/category";
import { useNavigate, useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 9;

const Products = () => {
  const [inStockOnly, setInStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const { getAllProducts } = useGetAllProducts();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pushCategoryType = (categoryType: CategoryType | undefined) => {
    if (categoryType) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("categoryType", categoryType);

      navigate(`/productos?${newParams.toString()}`);
    } else {
      navigate(`/productos`);
    }
  };

  const categoryType = searchParams.get("categoryType") as CategoryType | null;

  useEffect(() => {
    getAllProducts.fetch({
      categoryType: categoryType ? categoryType : undefined,
    });
  }, [categoryType]);

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

  const totalPages = getAllProducts.paginator?.pageCount || 0;
  const paginatedProducts = getAllProducts.data;
  const filteredProducts = getAllProducts.paginator?.dataCount;

  const page = searchParams.get("page");

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
                  selectedCategory={categoryType}
                  onCategoryChange={(categoryType) => {
                    pushCategoryType(categoryType);
                  }}
                  inStockOnly={inStockOnly}
                  onInStockChange={setInStockOnly}
                />
              </aside>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Buscar productos por nombre o descripción..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* <div className="mb-6">
                  <p className="text-muted-foreground">
                    Mostrando {paginatedProducts.length} de{" "}
                    {filteredProducts.length} productos
                  </p>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {getAllProducts.data?.map((product, index) => (
                    <div
                      key={index}
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
