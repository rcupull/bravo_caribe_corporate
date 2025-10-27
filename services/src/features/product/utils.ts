import { GetAllProductArgs } from '../../types/products';
import { getFilterQueryFactory, getSearchRegexQuery } from '../../utils/schemas';

export const getAllFilterQuery = getFilterQueryFactory<GetAllProductArgs>(
  ({ search, ...filterQuery }) => {
    if (search) {
      filterQuery.$or.push({ name: getSearchRegexQuery(search) });
      filterQuery.$or.push({ routeName: getSearchRegexQuery(search) });
    }

    return filterQuery;
  }
);

export const getProductSlugFromName = (name: string) => {
  return name
    .toLowerCase()
    .normalize('NFD') // Elimina tildes y diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Regex para remover los acentos
    .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
    .trim() // Elimina espacios al inicio y final
    .replace(/\s+/g, '-') // Reemplaza espacios por guiones
    .replace(/-+/g, '-');
};
