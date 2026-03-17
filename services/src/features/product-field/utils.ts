import { GetAllProductFieldArgs } from '../../types/product-field';
import { getFilterQueryFactory } from '../../utils/schemas';

export const getAllFilterQuery = getFilterQueryFactory<GetAllProductFieldArgs>(
  ({ ...filterQuery }) => {
    return filterQuery;
  }
);

export const getProductFieldSlugFromField = (field: string) => {
  return field
    .toLowerCase()
    .normalize('NFD') // Elimina tildes y diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Regex para remover los acentos
    .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
    .trim() // Elimina espacios al inicio y final
    .replace(/\s+/g, '-') // Reemplaza espacios por guiones
    .replace(/-+/g, '-');
};
