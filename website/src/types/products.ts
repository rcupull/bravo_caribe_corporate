import { BaseIdentity, Currency, Image } from "./general";
import { ProductCategory } from "./product-category";
import { ProductField } from "./product-field";

interface ProductFieldValue extends Pick<
  ProductField,
  "label" | "field" | "type"
> {
  value: any;
}

export interface Product extends BaseIdentity {
  images?: Array<Image>;
  createdBy: string;
  name: string;
  productSlug: string;
  price: number;
  currency: Currency;
  hidden?: boolean;
  stockAmount?: number;
  featured?: boolean;

  productCategoryIds?: Array<string>;
  productFieldsData?: Record<string, string>;

  //hot
  productCategories: Array<Pick<ProductCategory, "name">> | undefined;
  productFieldsMeta: Array<ProductFieldValue> | undefined;
}
