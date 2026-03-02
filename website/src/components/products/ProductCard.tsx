import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle, XCircle, FileImage } from "lucide-react";
import { Product } from "@/types/products";
import { ImageComponent } from "../image-component";
import { useCart } from "@/hooks/useCart";
import { cn, getWhatsAppLinkWithContactNumber } from "@/utils/general";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { images, productCategories, name, stockAmount, price } = product;

  const inStock = !!stockAmount;

  const { updateCart } = useCart();

  const image = images?.length ? images[0] : null;

  return (
    <Card className="group h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-warning">
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="flex items-center justify-center w-full h-56 bg-gray-200">
          {image ? (
            <ImageComponent image={image} className="h-56 object-cover" />
          ) : (
            <FileImage className="size-32 text-gray-300" />
          )}
        </div>
        <div className="absolute top-3 left-3">
          {productCategories?.map(({ name }, index) => {
            return (
              <Badge
                key={index}
                className={cn("bg-warning text-accent-foreground !block", {
                  "mt-1": index !== 0,
                })}
              >
                {name}
              </Badge>
            );
          })}
        </div>

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
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-warning transition-colors line-clamp-2">
          {name}
        </h3>

        {price && (
          <p className="text-2xl font-bold text-warning mt-4">
            ${price.toFixed(2)}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <a
          href={
            inStock
              ? getWhatsAppLinkWithContactNumber(
                  `Hola, estoy interesado en ${
                    product.name
                  }. ¿Podrian brindarme más información?`,
                )
              : undefined
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Button
            // onClick={(e) => {
            //   e.preventDefault();
            //   e.stopPropagation();

            //   updateCart(product._id, 1);
            // }}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            disabled={!inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cotizar ahora
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
