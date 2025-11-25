import { FilterQuery, Schema } from 'mongoose';
import { BaseIdentity, Currency, Image } from './general';
import { CategoryType } from './category';

export interface Product extends BaseIdentity {
  images?: Array<Image>;
  createdBy: Schema.Types.ObjectId;
  name: string;
  productSlug: string;
  price: number;
  currency: Currency;
  hidden?: boolean;
  inStock?: boolean;

  categoryType?: CategoryType;
  specs?: Record<string, string>;
}

export interface ProductDto extends Product {}

export interface ProductAdminDto extends Product {}

export interface GetAllProductArgs extends FilterQuery<Product> {
  search?: string;
}
