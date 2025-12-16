import { Shopping } from "@/types/shopping";

export const getShoppingTotalPrice = (shopping: Shopping): number => {
  const { products } = shopping;

  return products.reduce((acc, { productData, count }) => {
    const { price } = productData;

    return acc + count * price;
  }, 0);
};
