import { GetAllUsersArgs } from '../../types/user';
import { getFilterQueryFactory, getSearchRegexQuery } from '../../utils/schemas';

export const getAllFilterQuery = getFilterQueryFactory<GetAllUsersArgs>(
  ({ search, ...filterQuery }) => {
    if (search) {
      filterQuery.$or.push({ name: getSearchRegexQuery(search) });
      filterQuery.$or.push({ phone: getSearchRegexQuery(search) });
    }

    return filterQuery;
  }
);

export const MARKET = 'market';
