import { Product, ProductAdminDto, ProductDto } from '../../types/products';
import { deepJsonCopy } from '../../utils/general';

export class ProductDtosServices {
  constructor() {}

  getProductsDto = async (products: Array<Product>): Promise<Array<ProductDto>> => {
    const getProductDto = async (product: Product): Promise<ProductDto> => {
      return {
        ...deepJsonCopy(product)
      };
    };

    const promises = products.map(getProductDto);
    const out = await Promise.all(promises);

    return out;
  };

  getProductsAdminDto = async (products: Array<Product>): Promise<Array<ProductAdminDto>> => {
    const getProductDto = async (product: Product): Promise<ProductAdminDto> => {
      return {
        ...deepJsonCopy(product)
      };
    };

    const promises = products.map(getProductDto);
    const out = await Promise.all(promises);

    return out;
  };
}
