import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageComponent } from "@/components/image-component";
import { useCart } from "@/hooks/useCart";
import { FileImage, Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useModal } from "@/features/modal/useModal";
import { ButtonClose } from "@/components/button-close";
import { useRequestCart } from "@/api/cart/useRequestCart";
import { Link } from "@/components/link";
import { getProductRoute } from "@/utils/routes";

const paymentMethods = [
  { id: "cash", label: "Efectivo" },
  { id: "transfer", label: "Transferencia" },
  { id: "mobile", label: "Pago móvil" },
];

export const Page = () => {
  const { items, updateCart, totalPrice, removeFromCart, onFetch } = useCart();
  const { requestCart } = useRequestCart();
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const { pushModal } = useModal();

  const handleRemoveFromCart = (productId: string) => {
    pushModal({
      useProps: () => {
        const { onClose } = useModal();

        return {
          title: "Confirmar",
          className: "!max-w-[30rem]",
          content: (
            <div>Seguro que desea eliminar este producto del carro?</div>
          ),
          closeButton: <ButtonClose />,
          primaryBtn: (
            <Button
              onClick={() => {
                removeFromCart(productId);
                onClose();
              }}
            >
              Eliminar
            </Button>
          ),
        };
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center border border-border rounded-2xl p-8">
          <div className="flex justify-center mb-4">
            <FileImage className="h-16 w-16 text-muted-foreground" />
          </div>

          <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>

          <p className="text-muted-foreground mb-6">
            Aún no tienes productos para comprar. Explora nuestro catálogo y
            agrega los productos que más te gusten.
          </p>

          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to={getProductRoute()}>Ver productos</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-bold">Resumen de tu compra</h1>

          {items.length === 0 ? (
            <p className="text-muted-foreground">
              No hay productos en el carrito.
            </p>
          ) : (
            items.map(({ count, productData }) => {
              const { _id: productId, name, price, images } = productData;
              const image = images?.[0];

              return (
                <div
                  key={productId}
                  className="flex gap-4 border border-border rounded-2xl p-4"
                >
                  {image ? (
                    <ImageComponent
                      image={image}
                      className="h-20 w-20 object-cover rounded-xl"
                    />
                  ) : (
                    <FileImage className="h-20 w-20 text-muted-foreground" />
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${price?.toFixed(2)}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateCart(productId, count - 1)}
                        className="h-7 w-7"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Badge variant="secondary" className="px-3">
                        {count}
                      </Badge>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateCart(productId, count + 1)}
                        className="h-7 w-7"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="font-semibold text-right">
                      ${(price * count).toFixed(2)}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-auto text-destructive"
                      onClick={() => {
                        handleRemoveFromCart(productId);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Panel de pago */}
        <div className="space-y-6 border border-border rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-semibold">Método de pago</h2>

          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                  paymentMethod === method.id
                    ? "border-accent bg-accent/10"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                  className="accent-accent"
                />
                <span>{method.label}</span>
              </label>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-accent">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <Button
            disabled={!paymentMethod || items.length === 0}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => {
              requestCart.fetch(undefined, {
                onAfterSuccess: () => {
                  onFetch();
                },
              });
            }}
          >
            Confirmar y pagar
          </Button>
        </div>
      </div>
    </div>
  );
};
