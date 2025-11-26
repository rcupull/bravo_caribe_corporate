import { useSimpleSlice } from "@/features/redux/slices/useSimpleSlice";
import { CartItem } from "@/types/cart";
import { Product } from "@/types/products";

export const useCart = () => {
  const { data, setData } = useSimpleSlice<Array<CartItem>>("useCart");

  const addToCart = (product: Product) => {
    setData((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productSlug === product.productSlug
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.productSlug === product.productSlug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productSlug: string) => {
    setData((prevItems) =>
      prevItems.filter((item) => item.productSlug !== productSlug)
    );
  };

  const updateQuantity = (productSlug: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productSlug);
      return;
    }
    setData((prevItems) =>
      prevItems.map((item) =>
        item.productSlug === productSlug ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setData([]);
  };

  const totalItems = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = data.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return {
    items: data,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
};
