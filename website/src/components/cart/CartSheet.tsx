import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, Plus, Minus, FileImage } from "lucide-react";
import { ImageComponent } from "../image-component";
import { useCart } from "@/hooks/useCart";
import { Link } from "../link";
import { getContactRoute } from "@/utils/routes";

const CartSheet = () => {
  const { items, updateCart, totalItems, totalPrice, removeFromCart } =
    useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative hover:bg-primary-foreground/10"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent text-accent-foreground text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            <>
              {items.map(({ count, productData }, index) => {
                const {
                  name,
                  price,
                  currency,
                  images,
                  _id: productId,
                } = productData;
                const image = images && images.length > 0 ? images[0] : null;

                return (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-border pb-4"
                  >
                    {image ? (
                      <ImageComponent
                        image={image}
                        className="h-20 object-cover rounded"
                      />
                    ) : (
                      <FileImage className="h-20 w-20 text-gray-300 rounded" />
                    )}

                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        ${price?.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateCart(productId, count - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {count}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateCart(productId, count + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-auto text-destructive"
                          onClick={() => removeFromCart(productId)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-accent">${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to={getContactRoute()}>Solicitar Cotización</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
