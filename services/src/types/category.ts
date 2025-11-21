export enum CategoryType {
  TOOL = 'TOOL',
  TIRE = 'TIRE',
  OIL = 'OIL',
  PART = 'PART'
}

export enum CategorySpecsFields {
  'voltage' = 'voltage',
  'power' = 'power',
  'speed' = 'speed',
  'clampSize' = 'clampSize',
  'baseDiameter' = 'baseDiameter',
  'strokeLength' = 'strokeLength',
  'accessories' = 'accessories',
  'material' = 'material',
  'guarantee' = 'guarantee',
  'filtrationEfficiency' = 'filtrationEfficiency',
  'features' = 'features',
  'compatibleWith' = 'compatibleWith',
  'type' = 'type',
  'size' = 'size',
  'loadIndex' = 'loadIndex',
  'speedIndex' = 'speedIndex',
  'viscosity' = 'viscosity',
  'acea' = 'acea',
  'api' = 'api',
  'compatibleBrands' = 'compatibleBrands'
}

export interface Category {
  type: CategoryType;
  description: string;
  specsFields: Array<string>;
}
