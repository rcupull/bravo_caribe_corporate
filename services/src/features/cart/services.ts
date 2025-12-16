import { Request } from 'express';
import { ModelDocument, QueryHandle } from '../../types/general';
import { Product } from '../../types/products';
import { Shopping, ShoppingProductData, ShoppingState } from '../../types/shopping';
import { User } from '../../types/user';
import { ShoppingServices } from '../shopping/services';
import { isEqualIds } from '../../utils/general';

export class CartServices {
  constructor(readonly shoppingServices: ShoppingServices) {}

  private addAmountOfPostToShopping: QueryHandle<
    {
      amountToAdd: number | undefined;
      user: User | undefined;
      browserFingerprint: string | undefined;
      cartShopping: ModelDocument<Shopping> | null;
      product: Product;
    },
    ModelDocument<Shopping>
  > = async ({ amountToAdd = 1, user, browserFingerprint, cartShopping, product }) => {
    /**
     * ////////////////////////////////////////////////////////////////////////////////////
     * ////////////////////////////////////////////////////////////////////////////////////
     * Some validations
     * ////////////////////////////////////////////////////////////////////////////////////
     * ////////////////////////////////////////////////////////////////////////////////////
     */

    if (cartShopping) {
      /**
       * ////////////////////////////////////////////////////////////////////////////////////
       * ////////////////////////////////////////////////////////////////////////////////////
       * update the shopping with the new post
       * ////////////////////////////////////////////////////////////////////////////////////
       * ////////////////////////////////////////////////////////////////////////////////////
       */

      await this.addPostToShoppingCart({
        amountToAdd,
        product,
        cartShopping
      });

      return cartShopping;
    } else {
      /**
       * ////////////////////////////////////////////////////////////////////////////////////
       * ////////////////////////////////////////////////////////////////////////////////////
       * create new shopping with this post
       * ////////////////////////////////////////////////////////////////////////////////////
       * ////////////////////////////////////////////////////////////////////////////////////
       */

      const newCartShopping = await this.createShoppingCart({
        amountToAdd,
        user,
        browserFingerprint,
        product
      });

      return newCartShopping;
    }
  };

  private getPostDataToShopping: QueryHandle<
    {
      product: Product;
    },
    ShoppingProductData
  > = async ({ product }) => {
    return {
      _id: product._id,
      name: product.name,
      images: product.images,
      price: product.price,
      currency: product.currency
    };
  };

  private addNewPostToShoppingCart: QueryHandle<
    {
      amountToAdd?: number;
      product: Product;
      cartShopping: ModelDocument<Shopping>;
    },
    void
  > = async ({ amountToAdd = 1, product, cartShopping }) => {
    /**
     * Add a new post to shopping with the amount
     */
    cartShopping.products.push({
      productData: await this.getPostDataToShopping({ product }),
      count: amountToAdd
    });

    await cartShopping.save();
  };

  private updatePostAmountOnShoppingCart: QueryHandle<
    {
      cartShopping: ModelDocument<Shopping>;
      productIndex: number;
      amountToAdd: number;
      product: Product;
    },
    void
  > = async ({ cartShopping, productIndex, amountToAdd, product }) => {
    cartShopping.products[productIndex].count += amountToAdd;

    await cartShopping.save();
  };

  private removePostFromShoppingCart: QueryHandle<
    {
      cartShopping: ModelDocument<Shopping>;
      productIndex: number;
    },
    void
  > = async ({ cartShopping, productIndex }) => {
    cartShopping.products.splice(productIndex, 1);

    /**
     * If there are no posts left, delete the shopping
     */
    if (cartShopping.products.length === 0) {
      return await this.shoppingServices.deleteOne({
        query: { _id: cartShopping._id }
      });
    }

    await cartShopping.save();
  };

  private addPostToShoppingCart: QueryHandle<
    {
      amountToAdd?: number;
      product: Product;
      cartShopping: ModelDocument<Shopping>;
    },
    void
  > = async ({ amountToAdd = 1, product, cartShopping }) => {
    const { _id: productId } = product;

    const productIndex = cartShopping.products.findIndex((p) => {
      return isEqualIds(p.productData._id, productId);
    });

    if (productIndex >= 0) {
      /**
       * Exists the products in the shopping
       */
      const newPostCount = cartShopping.products[productIndex].count + amountToAdd;

      if (newPostCount <= 0) {
        /**
         * Remove the post if the amount is 0 or less
         */

        return await this.removePostFromShoppingCart({ cartShopping, productIndex });
      }

      /**
       * Update the post on ths shopping
       */

      return await this.updatePostAmountOnShoppingCart({
        amountToAdd,
        cartShopping,
        product,
        productIndex
      });
    }

    return await this.addNewPostToShoppingCart({
      amountToAdd,
      product,
      cartShopping
    });
  };

  private createShoppingCart: QueryHandle<
    {
      amountToAdd?: number;
      user: User | undefined;
      browserFingerprint: string | undefined;
      product: Product;
    },
    ModelDocument<Shopping>
  > = async ({ amountToAdd = 1, user, browserFingerprint, product }) => {
    const newShopping = await this.shoppingServices.addOne({
      state: ShoppingState.CONSTRUCTION,
      purchaserId: user && user._id,
      browserFingerprint,
      products: [
        {
          productData: await this.getPostDataToShopping({ product }),
          count: amountToAdd
        }
      ]
    });

    return newShopping;
  };

  addDesiredAmountOfPostToShopping: QueryHandle<
    {
      desiredAmountToAdd?: number;
      product: Product;
      user: User | undefined;
      browserFingerprint: string | undefined;
      cartShopping: ModelDocument<Shopping> | null;
    },
    ModelDocument<Shopping> | null
  > = async (args) => {
    const { desiredAmountToAdd = 1, product, user, browserFingerprint, cartShopping } = args;

    const { getOneProductShoppingData } = await this.shoppingServices.getShoppingDataFromProduct({
      products: [product]
    });

    const amountToAdd = (() => {
      const { stockAmountAvailable } = getOneProductShoppingData(product);

      if (desiredAmountToAdd > stockAmountAvailable) {
        /**
         * The user wants add more of the stockAmountAvailable
         */
        return stockAmountAvailable;
      }

      return desiredAmountToAdd;
    })();

    const newCartShopping = await this.addAmountOfPostToShopping({
      amountToAdd,
      product,
      user,
      browserFingerprint,
      cartShopping
    });

    return newCartShopping;
  };

  getCartShoppingFromRequest = async (req: Request): Promise<ModelDocument<Shopping> | null> => {
    const { user, browserFingerprint } = req;

    if (user) {
      const userCart = await this.shoppingServices.getOne({
        query: {
          state: ShoppingState.CONSTRUCTION,
          purchaserId: user._id
        }
      });

      return userCart;
    }

    if (browserFingerprint) {
      const userCart = await this.shoppingServices.getOne({
        query: {
          state: ShoppingState.CONSTRUCTION,
          browserFingerprint
        }
      });

      return userCart;
    }

    return null;
  };

  deleteOnePostFromShoppingInContruction: QueryHandle<{
    product: Product;
    cartShopping: ModelDocument<Shopping>;
  }> = async ({ product, cartShopping }) => {
    ////////////////////////////////////////////////////////////////////////////////////

    await cartShopping.updateOne({
      $pull: {
        products: {
          'productData._id': product._id.toString()
        }
      }
    });

    if (cartShopping.products.length === 1) {
      /**
       * si tenia 1 elemento, el cual ya fuel eliminado en el paso anterior entonces debe ser eliminada la shooping
       */
      await cartShopping.deleteOne();
    }
  };
}
