import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/utils/category";
import { CategoryType } from "@/types/category";

interface ProductFiltersProps {
  selectedCategory: CategoryType | undefined;
  onCategoryChange: (category: CategoryType | undefined) => void;
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
}

const ProductFilters = ({
  selectedCategory,
  onCategoryChange,
  inStockOnly,
  onInStockChange,
}: ProductFiltersProps) => {
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
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
            onClick={() => onCategoryChange(undefined)}
          >
            Todas
          </Badge>
          {categories.map(({ type, name }) => (
            <Badge
              key={type}
              variant={selectedCategory === type ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => onCategoryChange(type)}
            >
              {name}
            </Badge>
          ))}
        </div>
      </div>

      {/* In Stock Filter */}
      <div>
        <h4 className="font-semibold text-sm mb-3 text-foreground">
          Disponibilidad
        </h4>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 rounded border-input accent-accent"
          />
          <span className="text-sm text-muted-foreground">
            Solo productos disponibles
          </span>
        </label>
      </div>

      {/* Clear Filters */}
      {(selectedCategory !== null || inStockOnly) && (
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-6"
          onClick={() => {
            onCategoryChange(undefined);
            onInStockChange(false);
          }}
        >
          Limpiar Filtros
        </Button>
      )}
    </div>
  );
};

export default ProductFilters;
