import { CartServices } from './services';
import { ShoppingServices } from '../shopping/services';
import { controllerFactory } from '../../utils/controllers';
import {
  getProductNotFoundResponse,
  getShoppingNotFoundResponse,
  getUserNotFoundResponse
} from '../../utils/responses';
import { ProductServices } from '../product/services';
import { MongoObjectIdSchema } from '../../utils/zod-shapes';
import { ShoppingState } from '../../types/shopping';
export class CartController {
  constructor(
    private readonly cartServices: CartServices,
    private readonly shoppingServices: ShoppingServices,
    private readonly productServices: ProductServices
  ) {}

  get_cart = controllerFactory({}, async ({ req, res }) => {
    const cartShopping = await this.cartServices.getCartShoppingFromRequest(req);

    res.send(cartShopping);
  });

  post_cart_products_productId = controllerFactory(
    {
      bodyShape: (z) => ({
        amountToAdd: z.number().int()
      }),
      paramsShape: () => ({
        productId: MongoObjectIdSchema
      })
    },
    async ({ req, res, next }) => {
      const { user, browserFingerprint, body, params } = req;

      const cartShopping = await this.cartServices.getCartShoppingFromRequest(req);

      const { amountToAdd } = body;
      const { productId } = params;

      const product = await this.productServices.getOne({
        query: {
          _id: productId
        }
      });

      if (!product) {
        return getProductNotFoundResponse({ res });
      }

      await this.cartServices.addDesiredAmountOfPostToShopping({
        product,
        user,
        browserFingerprint,
        desiredAmountToAdd: amountToAdd,
        cartShopping
      });

      this.get_cart(req, res, next);
    }
  );

  /**
   * Services to add a user to a  shopping in construction
   * the shopping in construction can be creted witout purchaser when the user is not autenticated
   */
  post_cart_add_purchaser = controllerFactory(
    {
      //args
    },
    async ({ req, res, next }) => {
      const { user, browserFingerprint } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      /**
       * Remove the shopping in construction if exists.
       * Each user can have only one Shoping in contruction
       */

      const shoppingCart = await this.shoppingServices.getOne({
        query: {
          purchaserId: user._id,
          state: ShoppingState.CONSTRUCTION
        }
      });

      if (shoppingCart) {
        await this.shoppingServices.deleteOne({
          query: {
            _id: shoppingCart._id
          }
        });
      }

      await this.shoppingServices.updateOne({
        query: {
          browserFingerprint,
          state: ShoppingState.CONSTRUCTION
        },
        update: {
          purchaserId: user._id
        }
      });

      this.get_cart(req, res, next);
    }
  );

  delete_cart = controllerFactory(
    {
      //args
    },
    async ({ req, res, next }) => {
      const cartShopping = await this.cartServices.getCartShoppingFromRequest(req);

      if (cartShopping) {
        await this.shoppingServices.deleteOne({
          query: {
            _id: cartShopping._id
          }
        });
      }

      this.get_cart(req, res, next);
    }
  );

  delete_cart_products_productId = controllerFactory(
    {
      paramsShape: () => ({
        productId: MongoObjectIdSchema
      })
    },
    async ({ req, res, next }) => {
      const { params } = req;
      const cartShopping = await this.cartServices.getCartShoppingFromRequest(req);

      const { productId } = params;

      const product = await this.productServices.getOne({
        query: {
          _id: productId
        }
      });

      if (!product) {
        return getProductNotFoundResponse({ res });
      }

      if (!cartShopping) {
        return getShoppingNotFoundResponse({ res });
      }

      await this.cartServices.deleteOnePostFromShoppingInContruction({
        product,
        cartShopping
      });

      this.get_cart(req, res, next);
    }
  );

  post_cart_request = controllerFactory({}, async ({ req, res, next }) => {
    const { params } = req;

    let shoppingCart = await this.cartServices.getCartShoppingFromRequest(req);

    if (!shoppingCart) {
      return getShoppingNotFoundResponse({ res });
    }

    shoppingCart = this.shoppingServices.changeShoppingState(shoppingCart, ShoppingState.REQUESTED);

    await shoppingCart.save();

    this.get_cart(req, res, next);
  });
}
