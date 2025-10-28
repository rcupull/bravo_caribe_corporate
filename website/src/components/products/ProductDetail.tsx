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

  const generals = (
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

      {/* Características generales */}
      <div className="space-y-4 mb-6 bg-secondary p-4 rounded-lg">
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
    </div>
  );

  const details = (
    <div className="space-y-4 bg-secondary p-4 rounded-lg">
      <h4 className="font-semibold text-foreground">Especificaciones</h4>

      <div className="space-y-3 text-sm text-foreground/90">
        <div className="flex justify-between border-b border-border/40 pb-1">
          <span className="font-medium">Medida:</span>
          <span>195/65R15</span>
        </div>
        <div className="flex justify-between border-b border-border/40 pb-1">
          <span className="font-medium">Marca:</span>
          <span>Joyroad</span>
        </div>
        <div className="flex justify-between border-b border-border/40 pb-1">
          <span className="font-medium">Tipo:</span>
          <span>Tubeless</span>
        </div>
        <div className="flex justify-between border-b border-border/40 pb-1">
          <span className="font-medium">Modelo:</span>
          <span>HPRX3</span>
        </div>
        <div className="flex justify-between border-b border-border/40 pb-1">
          <span className="font-medium">Índice de Carga:</span>
          <span>95</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Índice de Velocidad:</span>
          <span>HXL</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mt-3">
        Excelente calidad y durabilidad. Diseñadas con tecnología de vanguardia
        que garantiza un rendimiento óptimo en diversas condiciones de manejo.
        <br />
        El patrón de la banda de rodadura está especialmente diseñado para
        ofrecer una tracción óptima incluso en condiciones adversas como lluvia
        o nieve, brindando mejor control del vehículo y reduciendo el riesgo de
        deslizamiento o aquaplaning.
      </p>
    </div>
  );

  const priceAndCTA = (
    <div>
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
  );

  const image = (
    <div className="relative col-span-1 md:col-span-2">
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
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[100vh] sm:max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:hidden gap-6">
          {image}

          {/* Detalles */}
          <div className="flex flex-col gap-2">
            {generals}
            {priceAndCTA}
            {details}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {image}

          <div>
            {generals}
            {priceAndCTA}
          </div>

          {details}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
