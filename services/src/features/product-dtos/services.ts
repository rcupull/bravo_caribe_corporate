import { Product, ProductAdminDto, ProductDto } from '../../types/products';
import { deepJsonCopy, isEqualIds } from '../../utils/general';
import { getInArrayQuery } from '../../utils/schemas';
import { ProductCategoryServices } from '../product-category/services';
import { ProductFieldServices } from '../product-field/services';

export class ProductDtosServices {
  constructor(
    private readonly productCategoryServices: ProductCategoryServices,
    private readonly productFieldServices: ProductFieldServices
  ) {}

  getProductsDto = async (products: Array<Product>): Promise<Array<ProductDto>> => {
    const allCategories = await this.productCategoryServices.getAll({
      query: {
        _id: getInArrayQuery(products.map((p) => p.productCategoryIds || []).flat())
      }
    });

    const allFields = await this.productFieldServices.getAll({
      query: {}
    });

    const getProductDto = async (product: Product): Promise<ProductDto> => {
      const allProductCategories = allCategories.filter((pc) => {
        return product.productCategoryIds?.some((productCategoryId) =>
          isEqualIds(pc._id, productCategoryId)
        );
      });

      const allFieldsIds = allProductCategories
        .map(({ productFieldIds }) => productFieldIds)
        .flat();

      const allProductFields = allFields.filter((pf) => {
        return allFieldsIds.some((allFieldId) => isEqualIds(pf._id, allFieldId));
      });

      return {
        ...deepJsonCopy(product),
        productCategories: allProductCategories.map(({ name }) => ({ name })),
        productFieldsMeta: allProductFields.map(({ label, field, type }) => {
          return {
            label,
            field,
            type,
            value: product.productFieldsData?.[field]
          };
        })
      };
    };

    const promises = products.map(getProductDto);
    const out = await Promise.all(promises);

    return out;
  };

  getProductsAdminDto = async (products: Array<Product>): Promise<Array<ProductAdminDto>> => {
    const allProductCategories = await this.productCategoryServices.getAll({
      query: {
        _id: getInArrayQuery(products.map((p) => p.productCategoryIds || []).flat())
      }
    });

    const getProductDto = async (product: Product): Promise<ProductAdminDto> => {
      return {
        ...deepJsonCopy(product),
        productCategories: allProductCategories
          .filter((pc) => {
            return product.productCategoryIds?.some((productCategoryId) =>
              isEqualIds(pc._id, productCategoryId)
            );
          })
          .map(({ name }) => ({ name }))
      };
    };

    const promises = products.map(getProductDto);
    const out = await Promise.all(promises);

    return out;
  };
}
