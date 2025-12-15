import { GetAllShoppingArgs } from '../../types/shopping';
import { getCharCode, getNumberCode } from '../../utils/general';
import {
  getFilterQueryFactory,
  getInArrayQuery,
  getSearchRegexQuery,
  setFilterQueryWithDates
} from '../../utils/schemas';

export const getAllFilterQuery = getFilterQueryFactory<GetAllShoppingArgs>(
  ({ states, dateFrom, dateTo, search, ...filterQuery }) => {
    if (search) {
      filterQuery.code = getSearchRegexQuery(search);
    }

    if (states?.length) {
      filterQuery.state = getInArrayQuery(states);
    }

    setFilterQueryWithDates({ filterQuery, dateFrom, dateTo });

    return filterQuery;
  }
);

export const getShoppingCode = (): string => {
  const chars = getCharCode(2);
  const numbers = getNumberCode(4);
  return `${chars}-${numbers}`;
};
