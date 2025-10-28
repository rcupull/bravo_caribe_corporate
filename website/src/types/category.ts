import { FunctionComponent } from "react";
import { StyleProps } from "./general";

export enum CategoryType {
  TOOL = "tool",
  TIRE = "tire",
  OIL = "oil",
  PART = "part",
}

export enum CategorySpecsFields {
  "voltage" = "voltage",
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

export interface Category {
  type: CategoryType;
  name: string;
  svg: FunctionComponent<StyleProps>;
  description: string;
  specsFields: Array<string>;
}
