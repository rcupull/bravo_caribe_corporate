import { Product } from "@/types/products";
import { useNavigate } from "react-router-dom";

export const useRequestProduct = () => {
  const navigate = useNavigate();

  return {
    onRequest: (product?: Product) => {
      if (product) {
        const { productSlug } = product;
        return navigate(`/contacto?productSlug=${productSlug}`);
      }
      navigate("/contacto");
    },
  };
};
