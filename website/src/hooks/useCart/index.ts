import { useCartRemoveProduct } from "@/api/cart/useCartRemoveProduct";
import { useGetCart } from "@/api/cart/useGetCart";
import { useUpdateAddCart } from "@/api/cart/useUpdateAddCart";
import { useApiPersistent } from "@/features/redux/slices/useApiPersistent";

export const useCart = () => {
  const { getCart } = useGetCart();

  const getCartPersistent = useApiPersistent("useCart", getCart);

  const { updateAddCart } = useUpdateAddCart();
  const { cartRemoveProduct } = useCartRemoveProduct();

  const shoppingToMake = getCartPersistent.data || null;

  const items = shoppingToMake?.products || [];

  return {
    shoppingToMake,
    isLoading: getCartPersistent.isPending,
    onSetCart: (shoppingCart) => {
      getCartPersistent.setData(shoppingCart);
    },
    onFetch: () => {
      getCartPersistent.fetch();
    },
    onReset: () => {
      getCartPersistent.reset();
    },
    updateCart: (productId: string, amountToAdd: number) => {
      updateAddCart.fetch(
        { productId, amountToAdd },
        {
          onAfterSuccess: (shoppingCart) => {
            getCartPersistent.setData(shoppingCart);
          },
        }
      );
    },
    removeFromCart: (productId: string) => {
      cartRemoveProduct.fetch(
        { productId },
        {
          onAfterSuccess: (shoppingCart) => {
            getCartPersistent.setData(shoppingCart);
          },
        }
      );
    },
    clearCart: () => {},
    //
    items,
    totalItems: items.length,
    totalPrice: items.reduce((acc, { productData, count }) => {
      const { price } = productData;

      return acc + count * price;
    }, 0),
  };
};
