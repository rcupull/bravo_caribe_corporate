import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  inStock: boolean;
  category?: string;
  brand?: string;
}

interface ProductCardProps {
  product: Product;
  onQuoteRequest?: (productId: string) => void;
}

const ProductCard = ({ product, onQuoteRequest }: ProductCardProps) => {
  const handleQuoteClick = () => {
    if (onQuoteRequest) {
      onQuoteRequest(product.id);
    }
  };

  return (
    <Card className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-accent">
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.category && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            {product.category}
          </Badge>
        )}
        <Badge 
          variant={product.inStock ? "default" : "secondary"}
          className={`absolute top-3 right-3 ${product.inStock ? 'bg-green-600' : 'bg-gray-500'}`}
        >
          {product.inStock ? (
            <CheckCircle className="h-3 w-3 mr-1" />
          ) : (
            <XCircle className="h-3 w-3 mr-1" />
          )}
          {product.inStock ? "Disponible" : "Agotado"}
        </Badge>
      </div>

      <CardContent className="flex-1 p-6">
        {product.brand && (
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">
            {product.brand}
          </p>
        )}
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {product.description}
        </p>
        {product.price && (
          <p className="text-2xl font-bold text-accent mt-4">
            ${product.price.toFixed(2)}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={handleQuoteClick}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Solicitar Cotización
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
