import { BaseIdentity } from "./general";

export enum ProductFieldType {
  string = "string",
  longString = "longString",
}

export interface ProductField extends BaseIdentity {
  field: string;
  type: ProductFieldType;
  productFieldSlug: string;
  description?: string;
  label: string;
}
