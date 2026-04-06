import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import QuickQuoteCTA from "@/components/products/QuickQuoteCTA";
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
import { useProductDetails } from "@/hooks/useProductDetails";
import { useRouter } from "@/hooks/useRouter";
import { useDebouncer } from "@/hooks/useDebouncer";
import { isNumber, isString } from "@/utils/general";
import { PaginatorComponent } from "@/components/paginator-component";

export const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { getAllProducts } = useGetAllProducts();

  const { query, onChangeQuery } = useRouter();

  const categorySlugs = (query.categorias || []) as string[];
  const page = isNumber(query.page) ? Number(query.page) : 1;
  const search = isString(query.search) ? query.search : "";

  const inStockOnly = !!query.enStock;

  const debouncer = useDebouncer();

  useEffect(() => {
    getAllProducts.fetch({ categorySlugs, inStockOnly, page, search });
  }, [JSON.stringify({ categorySlugs, inStockOnly, page, search })]);

  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  const { productDetails } = useProductDetails();

  const totalPages = getAllProducts.paginator?.pageCount || 0;

  return (
    <>
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
              <ProductFilters />
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
                      const newSearch = e.target.value;
                      setSearchQuery(newSearch);

                      debouncer(() => {
                        onChangeQuery({
                          search: newSearch,
                          page: 1,
                        });
                      }, 1000);
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
                    onClick={() => {
                      productDetails.open({ product });
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              <PaginatorComponent
                paginator={getAllProducts.paginator}
                onChangePage={(page) => onChangeQuery({ page })}
              />
            </div>
          </div>
        </div>
      </section>

      <QuickQuoteCTA />
    </>
  );
};
