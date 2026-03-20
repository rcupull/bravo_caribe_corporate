import { FilterQuery, Schema } from 'mongoose';
import { BaseIdentity, Currency, Image } from './general';
import { ProductCategory } from './product-category';
import { ProductField } from './product-field';

interface ProductFieldValue extends Pick<ProductField, 'label' | 'field' | 'type'> {
  value: any;
}

export interface Product extends BaseIdentity {
  images?: Array<Image>;
  createdBy: Schema.Types.ObjectId;
  name: string;
  productSlug: string;
  price: number;
  currency: Currency;
  hidden?: boolean;
  stockAmount?: number;
  featured?: boolean;

  offerAmount?: number;
  offerPrice?: number;

  productCategoryIds?: Array<Schema.Types.ObjectId>;
  productFieldsData?: Record<string, string>;
}

export interface ProductDto extends Product {
  productCategories: Array<Pick<ProductCategory, 'name'>> | undefined;
  productFieldsMeta: Array<ProductFieldValue> | undefined;
}

export interface ProductAdminDto extends Product {
  productCategories: Array<Pick<ProductCategory, 'name'>> | undefined;
}

export interface GetAllProductArgs extends FilterQuery<Product> {
  search?: string;
}
