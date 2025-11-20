import { CategorySpecsFields, CategoryType } from "./category";
import { BaseIdentity, Currency, Image } from "./general";

export interface Product extends BaseIdentity {
  images?: Array<Image>;
  createdBy: string;
  description?: string;
  details?: string;
  name: string;
  productSlug: string;
  price: number;
  currency: Currency;
  hidden?: boolean;
  inStock?: boolean;

  categoryType?: CategoryType;
  specs?: Record<CategorySpecsFields, string>;
}
