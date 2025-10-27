import { modelGetter } from './schemas';

import { getAllFilterQuery, getProductSlugFromName } from './utils';
import { GetAllProductArgs, Product } from '../../types/products';
import { ModelCrudTemplate } from '../../utils/ModelCrudTemplate';

export class ProductServices extends ModelCrudTemplate<
  Product,
  Pick<
    Product,
    | 'description'
    | 'images'
    | 'price'
    | 'currency'
    | 'name'
    | 'productSlug'
    | 'details'
    | 'createdBy'
    | 'hidden'
  >,
  GetAllProductArgs
> {
  constructor() {
    super(modelGetter, getAllFilterQuery);
  }

  getProductSlugFromName: typeof getProductSlugFromName = (name) => getProductSlugFromName(name);
}
