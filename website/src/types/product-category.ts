import { BaseIdentity } from "./general";
import { ProductField } from "./product-field";

export interface ProductCategory extends BaseIdentity {
  name: string;
  description: string;
  productFieldIds: Array<string>;
  productCategorySlug: string;
  //hot
  productFields: Array<ProductField>;
}
