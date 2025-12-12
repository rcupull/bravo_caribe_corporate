import { CategorySpecsFields, CategoryType } from "./category";
import { BaseIdentity, Currency, Image } from "./general";

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

  categoryType?: CategoryType;
  specs?: Partial<Record<CategorySpecsFields, string>>;
}
