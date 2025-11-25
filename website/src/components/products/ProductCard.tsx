import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle, XCircle, FileImage } from "lucide-react";
import { Product } from "@/types/products";
import { ImageComponent } from "../image-component";
import { getCurrentCategory } from "@/utils/category";

interface ProductCardProps {
  product: Product;
  onQuoteRequest?: (productId: string) => void;
}

const ProductCard = ({ product, onQuoteRequest }: ProductCardProps) => {
  const { images, categoryType, productSlug, name, inStock, price } = product;

  const currentCategory = getCurrentCategory(categoryType);

  const image = images?.length ? images[0] : null;
  const handleQuoteClick = () => {
    if (onQuoteRequest) {
      onQuoteRequest(productSlug);
    }
  };

  return (
    <Card className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-accent">
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="flex items-center justify-center w-full h-56 bg-gray-200">
          {image ? (
            <ImageComponent image={image} className="h-56 object-cover" />
          ) : (
            <FileImage className="size-32 text-gray-300" />
          )}
        </div>
        {currentCategory?.name && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            {currentCategory?.name}
          </Badge>
        )}
        <Badge
          variant={inStock ? "default" : "secondary"}
          className={`absolute top-3 right-3 ${
            inStock ? "bg-green-600" : "bg-gray-500"
          }`}
        >
          {inStock ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 mr-1" />
          )}
          {inStock ? "Disponible" : "Agotado"}
        </Badge>
      </div>

      <CardContent className="flex-1 p-6">
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {name}
        </h3>
        {/* <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p> */}
        {price && (
          <p className="text-2xl font-bold text-accent mt-4">
            ${price.toFixed(2)}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          onClick={handleQuoteClick}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          disabled={!inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Solicitar Cotización
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
