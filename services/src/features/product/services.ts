import { modelGetter } from './schemas';

import { getAllFilterQuery, getProductSlugFromName } from './utils';
import { GetAllProductArgs, Product } from '../../types/products';
import { ModelCrudTemplate } from '../../utils/ModelCrudTemplate';

export class ProductServices extends ModelCrudTemplate<
  Product,
  Pick<
    Product,
    | 'images'
    | 'price'
    | 'currency'
    | 'name'
    | 'productSlug'
    | 'createdBy'
    | 'hidden'
    | 'stockAmount'
    | 'categoryType'
    | 'featured'
    | 'specs'
  >,
  GetAllProductArgs
> {
  constructor() {
    super(modelGetter, getAllFilterQuery);
  }

  getProductSlugFromName: typeof getProductSlugFromName = (name) => getProductSlugFromName(name);
}
