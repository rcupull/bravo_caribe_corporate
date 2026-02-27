import { modelGetter } from './schemas';

import { ModelCrudTemplate } from '../../utils/ModelCrudTemplate';
import { getAllFilterQuery } from './utils';
import { GetAllProductCategoryArgs, ProductCategory } from '../../types/product-category';

export class ProductCategoryServices extends ModelCrudTemplate<
  ProductCategory,
  Pick<ProductCategory, 'description' | 'name' | 'productFieldIds' | 'productCategorySlug'>,
  GetAllProductCategoryArgs
> {
  constructor() {
    super(modelGetter, getAllFilterQuery);
  }
}
