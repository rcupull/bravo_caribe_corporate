import { modelGetter } from './schemas';

import { ModelCrudTemplate } from '../../utils/ModelCrudTemplate';
import { ProductField, GetAllProductFieldArgs } from '../../types/product-field';
import { getAllFilterQuery } from './utils';

export class ProductFieldServices extends ModelCrudTemplate<
  ProductField,
  Pick<ProductField, 'field' | 'label' | 'type' | 'productFieldSlug'>,
  GetAllProductFieldArgs
> {
  constructor() {
    super(modelGetter, getAllFilterQuery);
  }
}
