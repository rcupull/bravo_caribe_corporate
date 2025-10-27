import { FilterQuery, Schema } from 'mongoose';
import { BaseIdentity, Currency, Image } from './general';

export interface Product extends BaseIdentity {
  images?: Array<Image>;
  createdBy: Schema.Types.ObjectId;
  description?: string;
  details?: string;
  name: string;
  productSlug: string;
  price: number;
  currency: Currency;
  hidden?: boolean;
}

export interface ProductDto extends Product {}

export interface ProductAdminDto extends Product {}

export interface GetAllProductArgs extends FilterQuery<Product> {
  search?: string;
}
