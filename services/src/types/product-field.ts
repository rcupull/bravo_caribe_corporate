import { FilterQuery } from 'mongoose';
import { BaseIdentity } from './general';

export enum ProductFieldType {
  string = 'string',
  longString = 'longString'
}

export interface ProductField extends BaseIdentity {
  field: string;
  type: ProductFieldType;
  productFieldSlug: string;
  label: string;
}

export interface GetAllProductFieldArgs extends FilterQuery<ProductField> {}
