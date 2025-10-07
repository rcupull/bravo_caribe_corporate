import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  Shield,
} from "lucide-react";
import { Product } from "../products/ProductCard";

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg"
            />
            <Badge
              variant={product.inStock ? "default" : "secondary"}
              className={`absolute top-4 right-4 ${
                product.inStock ? "bg-green-600" : "bg-gray-500"
              }`}
            >
              {product.inStock ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <XCircle className="h-3 w-3 mr-1" />
              )}
              {product.inStock ? "Disponible" : "Agotado"}
            </Badge>
          </div>

          {/* Details */}
          <div>
            {product.brand && (
              <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                {product.brand}
              </p>
            )}

            {product.category && (
              <Badge className="mb-4 bg-accent text-accent-foreground">
                {product.category}
              </Badge>
            )}

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Additional Details */}
            <div className="space-y-4 mb-6 bg-secondary p-4 rounded-lg">
              <h4 className="font-semibold text-foreground">Características</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      Producto Original
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Garantía de calidad certificada
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      Envío Disponible
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Entrega a todo el país
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-sm text-foreground">
                      Garantía Incluida
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Respaldado por el fabricante
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Actions */}
            {product.price && (
              <p className="text-3xl font-bold text-accent mb-6">
                ${product.price.toFixed(2)}
              </p>
            )}

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
