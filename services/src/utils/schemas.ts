import {
  AggregatePaginateModel,
  FilterQuery,
  isValidObjectId,
  model,
  PaginateModel,
  Schema,
  SchemaDefinition
} from 'mongoose';

import { ObjectId } from 'mongodb';

import mongoosePaginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { AnyRecord } from '../types/general';
import { compact, getFlattenUndefinedJson, isEmpty } from './general';

export const createdAtSchemaDefinition: SchemaDefinition = {
  createdAt: { type: Date, required: true, default: Date.now }
};

export const getInArrayQuery = <T extends AnyRecord = AnyRecord>(
  anyArray: Array<string | number | Schema.Types.ObjectId>
): FilterQuery<T> => {
  return { $in: anyArray };
};

export const getSearchRegexQuery = <T extends AnyRecord = AnyRecord>(
  search = ''
): FilterQuery<T> => {
  return { $regex: new RegExp(search.trim()), $options: 'i' };
};

export const getMongoModel = <T extends AnyRecord>(
  ref: string,
  schema: Schema,
  collectionName: string
) => {
  schema.plugin(mongoosePaginate);
  schema.plugin(aggregatePaginate);

  return model<T, PaginateModel<T> & AggregatePaginateModel<T>>(ref, schema, collectionName);
};

export const getMongooseModel = <T extends AnyRecord>(
  mongooseModel: typeof model,
  ref: string,
  schema: Schema,
  collectionName: string
) => {
  schema.plugin(mongoosePaginate);
  schema.plugin(aggregatePaginate);

  return mongooseModel<T, PaginateModel<T> & AggregatePaginateModel<T>>(
    ref,
    schema,
    collectionName
  );
};

export const lastUpQuerySort = '-createdAt';
export const defaultQuerySort = lastUpQuerySort;

export const toObjectId = (str: string): Schema.Types.ObjectId => {
  return new ObjectId(str) as unknown as Schema.Types.ObjectId;
};

export const toObjectIdIfValid = (str: string): Schema.Types.ObjectId | undefined => {
  return isValidObjectId(str) ? toObjectId(str) : undefined;
};

export const stringToObjectIdArray = (stringArray: Array<string>): Array<Schema.Types.ObjectId> => {
  const out = stringArray.map((str) => toObjectIdIfValid(str));

  return compact(out);
};
export const getSortQuery = (sort: string | undefined): Record<string, number> | undefined => {
  /**
   * get the query from a field similar to '-createdAt' or 'createdAt'
   */
  if (!sort) return undefined;

  const field = sort[0] === '-' ? sort.slice(1) : sort;
  const direction = sort[0] === '-' ? -1 : 1;

  if (!field || !direction) {
    return undefined;
  }

  return { [field]: direction };
};

type GetFilterQuery<T extends AnyRecord = AnyRecord, F extends FilterQuery<T> = FilterQuery<T>> = (
  filterQuery: F
) => F;

export const getFilterQueryFactory = <
  T extends AnyRecord = AnyRecord,
  F extends FilterQuery<T> = FilterQuery<T>
>(
  callback: GetFilterQuery<T, F>
): GetFilterQuery<T, F> => {
  const out: GetFilterQuery<T, F> = (allFilterQuery) => {
    let filterQuery: F = allFilterQuery;

    /**
     * ///////////////////////////////////////////////////////////////////
     * ///////////////////////////////////////////////////////////////////
     * Add empty $or
     * ///////////////////////////////////////////////////////////////////
     * ///////////////////////////////////////////////////////////////////
     */
    if (!filterQuery.$or) {
      filterQuery.$or = [];
    }

    if (!filterQuery.$and) {
      filterQuery.$and = [];
    }

    /**
     * ///////////////////////////////////////////////////////////////////
     * ///////////////////////////////////////////////////////////////////
     * Run callback
     * ///////////////////////////////////////////////////////////////////
     * ///////////////////////////////////////////////////////////////////
     */
    filterQuery = callback(filterQuery);

    /**
     * ///////////////////////////////////////////////////////////////////
     * ///////////////////////////////////////////////////////////////////
     * Remove empty $or
     * ///////////////////////////////////////////////////////////////////
     * ///////////////////////////////////////////////////////////////////
     */
    if (isEmpty(filterQuery.$or)) {
      delete filterQuery.$or;
    }

    if (isEmpty(filterQuery.$and)) {
      delete filterQuery.$and;
    }

    return getFlattenUndefinedJson(filterQuery);
  };

  return out;
};
