import { ProductCategory, ProductCategoryDto } from '../../types/product-category';
import { deepJsonCopy, isEqualIds } from '../../utils/general';
import { getInArrayQuery } from '../../utils/schemas';
import { ProductFieldServices } from '../product-field/services';

export class ProductCategoryDtosServices {
  constructor(private readonly productFieldServices: ProductFieldServices) {}

  getProductsCategoryDto = async (
    products: Array<ProductCategory>
  ): Promise<Array<ProductCategoryDto>> => {
    const allProductFields = await this.productFieldServices.getAll({
      query: {
        _id: getInArrayQuery(products.map((p) => p.productFieldIds).flat())
      }
    });

    const getDto = async (productCategory: ProductCategory): Promise<ProductCategoryDto> => {
      return {
        ...deepJsonCopy(productCategory),
        productFields: allProductFields.filter((pf) => {
          return productCategory.productFieldIds.some((productFieldId) =>
            isEqualIds(pf._id, productFieldId)
          );
        })
      };
    };

    const promises = products.map(getDto);
    const out = await Promise.all(promises);

    return out;
  };
}
