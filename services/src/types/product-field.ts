import { FilterQuery } from 'mongoose';

export enum ProductFieldType {
  string = 'string'
}

export interface ProductField {
  field: string;
  type: ProductFieldType;
  productFieldSlug: string;
  label: string;
}

export interface GetAllProductFieldArgs extends FilterQuery<ProductField> {}
