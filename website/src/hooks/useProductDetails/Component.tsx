import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  CheckCircle,
  XCircle,
  Package,
  Truck,
  Shield,
  FileImage,
} from "lucide-react";
import { Product } from "@/types/products";
import { getCurrentCategory } from "@/utils/category";
import { isNullOrUndefined } from "@/utils/general";
import { ImageComponent } from "@/components/image-component";
import { useRequestProduct } from "../useRequestProduct";
import { useModal } from "@/features/modal/useModal";

interface ComponentProps {
  product: Product;
}

const Component = ({ product }: ComponentProps) => {
  const { specs, images, price, inStock, categoryType, name } = product;
  const { onClose } = useModal();

  const { onRequest } = useRequestProduct();

  const currentCategory = getCurrentCategory(categoryType);

  const image = images && images.length > 0 ? images[0] : null;

  const generals = (
    <div>
      {currentCategory && (
        <Badge className="mb-4 bg-accent text-accent-foreground">
          {currentCategory.name}
        </Badge>
      )}

      {/* <p className="text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p> */}

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

      {currentCategory && (
        <div className="space-y-3 text-sm text-foreground/90">
          {currentCategory.specsFields.map(({ label, field }) => {
            const value = specs ? specs[field] : null;

            if (isNullOrUndefined(value)) {
              return null;
            }
            return (
              <div className="flex justify-between border-b border-border/40 pb-1">
                <span className="font-medium">{`${label}:`}</span>
                <span>{value}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* <p className="text-sm text-muted-foreground leading-relaxed mt-3">
        Excelente calidad y durabilidad. Diseñadas con tecnología de vanguardia
        que garantiza un rendimiento óptimo en diversas condiciones de manejo.
        <br />
        El patrón de la banda de rodadura está especialmente diseñado para
        ofrecer una tracción óptima incluso en condiciones adversas como lluvia
        o nieve, brindando mejor control del vehículo y reduciendo el riesgo de
        deslizamiento o aquaplaning.
      </p> */}
    </div>
  );

  const priceAndCTA = (
    <div>
      {price && (
        <p className="text-3xl font-bold text-accent mb-6">
          ${price.toFixed(2)}
        </p>
      )}

      <div className="flex gap-3">
        <Button
          onClick={() => {
            onClose();
            onRequest(product);
          }}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          disabled={!inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Solicitar este producto
        </Button>
      </div>
    </div>
  );

  const imageElement = (
    <div className="relative col-span-1 md:col-span-2">
      <div className="flex items-center justify-center">
        {image ? (
          <ImageComponent
            image={image}
            className="h-80 object-cover rounded-lg"
          />
        ) : (
          <FileImage className="size-32 text-gray-300 " />
        )}
      </div>
      <Badge
        variant={inStock ? "default" : "secondary"}
        className={`absolute top-4 right-4 ${
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
  );

  return (
    <>
      <div className="grid md:hidden gap-6">
        {imageElement}

        {/* Detalles */}
        <div className="flex flex-col gap-2">
          {generals}
          {priceAndCTA}
          {details}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {imageElement}

        <div>
          {generals}
          {priceAndCTA}
        </div>

        {details}
      </div>
    </>
  );
};

export default Component;
