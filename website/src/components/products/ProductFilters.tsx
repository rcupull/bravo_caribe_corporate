import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetAllProductCategories } from "@/api/product-categories/useGetAllProductCategories";
import { useEffect } from "react";
import { useRouter } from "@/hooks/useRouter";
import { FieldCheckbox } from "../ui/field-checkbox";

const ProductFilters = () => {
  const { query, onChangeQuery } = useRouter();

  const categorySlugs = (query.categorias || []) as string[];
  const inStockOnly = !!query.enStock;

  const { getAllProductCategories } = useGetAllProductCategories();

  useEffect(() => {
    getAllProductCategories.fetch({ pagination: false });
  }, []);

  const productCategories = getAllProductCategories.data || [];

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="font-bold text-lg mb-4 text-foreground">Filtros</h3>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-3 text-foreground">
          Categorías
        </h4>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={categorySlugs.length === 0 ? "default" : "outline"}
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => onChangeQuery({ categorias: [] })}
          >
            Todas
          </Badge>
          {productCategories.map(({ name, productCategorySlug }, index) => {
            const selected = categorySlugs.includes(productCategorySlug);

            return (
              <Badge
                key={index}
                variant={selected ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => {
                  if (selected) {
                    onChangeQuery({
                      categorias: categorySlugs.filter(
                        (slug) => slug !== productCategorySlug,
                      ),
                    });
                  } else {
                    onChangeQuery({
                      categorias: [...categorySlugs, productCategorySlug],
                    });
                  }
                }}
              >
                {name}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* In Stock Filter */}
      <div>
        <h4 className="font-semibold text-sm mb-3 text-foreground">
          Disponibilidad
        </h4>
        <FieldCheckbox
          label="Solo productos disponibles"
          type="checkbox"
          noUseFormik
          checked={!!inStockOnly}
          onChange={(e) => onChangeQuery({ enStock: e.target.checked })}
          className="w-4 h-4 rounded border-input accent-accent"
        />
      </div>

      {(!!categorySlugs.length || inStockOnly) && (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-6"
          onClick={() => {
            onChangeQuery({
              categorias: [],
              enStock: undefined,
            });
          }}
        >
          Limpiar Filtros
        </Button>
      )}
    </div>
  );
};

export default ProductFilters;
