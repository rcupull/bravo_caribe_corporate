import { RequestHandler } from 'express';
import { PaginationParameters } from 'mongoose-paginate-v2';
import { PaginateOptions } from 'mongoose';
import { isString } from '../utils/general';
import { defaultQuerySort, getSortQuery } from '../utils/schemas';

export const paginationCustomLabels: PaginateOptions['customLabels'] = {
  totalDocs: 'dataCount',
  docs: 'data',
  limit: 'limit',
  page: 'page',
  nextPage: 'nextPage',
  prevPage: 'prevPage',
  totalPages: 'pageCount',
  pagingCounter: 'pagingCounter',
  meta: 'paginator'
};

export const middlewarePagination: RequestHandler = (req, _, next) => {
  const parameters = new PaginationParameters(req);

  const paginateOptions = parameters.getOptions();

  paginateOptions.customLabels = paginationCustomLabels;

  if (isString(paginateOptions.sort)) {
    paginateOptions.sort = getSortQuery(paginateOptions.sort);
  } else {
    paginateOptions.sort = getSortQuery(defaultQuerySort);
  }

  req.paginateOptions = paginateOptions;

  Object.keys(paginateOptions).forEach((key) => {
    if (key in req.query) {
      delete req.query[key];
    }
  });

  next();
};
