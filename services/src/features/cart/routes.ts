import { Router } from 'express';

import { CartController } from './controller';

import { AccessServices } from '../access/services';

/////////////////////////////////////////////////////////////////

export class CartRouter {
  constructor(
    private readonly cartController: CartController,
    private readonly accessServices: AccessServices
  ) {
    this.router
      .route('/cart')
      .get(this.accessServices.middlewareGetUser, this.cartController.get_cart)
      .delete(this.accessServices.middlewareGetUser, this.cartController.delete_cart);

    this.router
      .route('/cart/add-purchaser')
      .post(this.accessServices.middlewareIsLogged, this.cartController.post_cart_add_purchaser);

    this.router
      .route('/cart/products/:productId')
      .post(this.accessServices.middlewareGetUser, this.cartController.post_cart_products_productId)
      .delete(
        this.accessServices.middlewareGetUser,
        this.cartController.delete_cart_products_productId
      );

    this.router
      .route('/cart/request')
      .post(this.accessServices.middlewareIsLogged, this.cartController.post_cart_request);
  }

  public readonly router: Router = Router();
}
