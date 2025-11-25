import { FunctionComponent } from "react";
import { StyleProps } from "./general";

export enum CategoryType {
  TOOL = "TOOL",
  TIRE = "TIRE",
  OIL = "OIL",
  PART = "PART",
}

export enum CategorySpecsFields {
  "voltage" = "voltage",
  "frequecy" = "frequecy",
  "brand" = "brand",
  "model" = "model",
  "power" = "power",
  "speed" = "speed",
  "clampSize" = "clampSize",
  "baseDiameter" = "baseDiameter",
  "strokeLength" = "strokeLength",
  "accessories" = "accessories",
  "material" = "material",
  "guarantee" = "guarantee",
  "filtrationEfficiency" = "filtrationEfficiency",
  "features" = "features",
  "compatibleWith" = "compatibleWith",
  "type" = "type",
  "size" = "size",
  "loadIndex" = "loadIndex",
  "speedIndex" = "speedIndex",
  "viscosity" = "viscosity",
  "acea" = "acea",
  "api" = "api",
  "compatibleBrands" = "compatibleBrands",
}

export enum CategorySpecsType {
  "string" = "string",
  "number" = "number",
  "longString" = "longString",
}

export interface Category {
  type: CategoryType;
  name: string;
  svg: FunctionComponent<StyleProps>;
  description: string;
  specsFields: Array<{
    field: CategorySpecsFields;
    label: string;
    type: CategorySpecsType;
  }>;
}
