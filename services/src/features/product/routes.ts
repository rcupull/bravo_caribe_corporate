import { Router } from 'express';

import { ProductController } from './controller';

import { AccessServices } from '../access/services';
import { Access } from '../../types/user';

export class ProductRouter {
  constructor(
    private readonly productController: ProductController,
    private readonly accessServices: AccessServices
  ) {
    this.router
      .route('/admin/products')
      .get(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productController.admin_get_products
      )
      .post(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productController.admin_post_products
      );

    /**
     * ////////////////////////////////////////////////////////////////////////////////////////////////////
     */

    this.router
      .route('/admin/products/:productSlug')
      .get(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productController.admin_get_products_productSlug
      )
      .put(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productController.admin_put_products_productSlug
      )
      .delete(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productController.admin_delete_products_productSlug
      );

    this.router.route('/products').get(this.productController.get_products);

    this.router
      .route('/products/:productSlug')
      .get(this.productController.get_products_productSlug);
  }

  public readonly router: Router = Router();
}
