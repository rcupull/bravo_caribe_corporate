import { FilterQuery, Schema } from 'mongoose';
import { BaseIdentity } from './general';
import { Product } from './products';

export enum ShoppingState {
  CONSTRUCTION = 'CONSTRUCTION',
  REQUESTED = 'REQUESTED',
  APPROVED = 'APPROVED',
  READY_TO_DELIVERY = 'READY_TO_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED'
}

export interface ShoppingProductData
  extends Pick<Product, '_id' | 'images' | 'name' | 'currency' | 'price'> {}

export interface GetAllShoppingArgs extends FilterQuery<Shopping> {
  states?: Array<ShoppingState>;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface ShoppingProductsMeta {
  productData: ShoppingProductData;
  count: number;
}

export interface Shopping extends BaseIdentity {
  products: Array<ShoppingProductsMeta>;
  //
  purchaserId?: Schema.Types.ObjectId;
  browserFingerprint?: string;
  //
  code: string;
  //
  state: ShoppingState;
  history?: Array<{
    state: ShoppingState;
    lastUpdatedDate: Date;
    reason?: string;
  }>;
}
