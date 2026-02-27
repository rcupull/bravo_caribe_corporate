import { FilterQuery, Schema } from 'mongoose';
import { BaseIdentity } from './general';
import { ProductField } from './product-field';

export interface ProductCategory extends BaseIdentity {
  name: string;
  description: string;
  productFieldIds: Array<Schema.Types.ObjectId>;
  productCategorySlug: string;
}

export interface ProductCategoryDto extends ProductCategory {
  productFields: Array<ProductField>;
}

export interface GetAllProductCategoryArgs extends FilterQuery<ProductCategory> {}
