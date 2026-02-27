import { GetAllProductCategoryArgs } from '../../types/product-category';
import { getFilterQueryFactory } from '../../utils/schemas';

export const getAllFilterQuery = getFilterQueryFactory<GetAllProductCategoryArgs>(
  ({ ...filterQuery }) => {
    return filterQuery;
  }
);

export const getProductCategorySlugFromName = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD') // Elimina tildes y diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Regex para remover los acentos
    .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
    .trim() // Elimina espacios al inicio y final
    .replace(/\s+/g, '-') // Reemplaza espacios por guiones
    .replace(/-+/g, '-');
};
