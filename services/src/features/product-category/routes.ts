import { Router } from 'express';

import { AccessServices } from '../access/services';
import { Access } from '../../types/user';
import { ProductCategoryController } from './controller';

export class ProductCategoryRouter {
  constructor(
    private readonly productCategoryController: ProductCategoryController,
    private readonly accessServices: AccessServices
  ) {
    this.router
      .route('/product-categories')
      .get(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productCategoryController.get_product_categories
      )
      .post(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productCategoryController.post_product_categories
      );

    /**
     * ////////////////////////////////////////////////////////////////////////////////////////////////////
     */

    this.router
      .route('/product-categories/:productCategorySlug')
      .get(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productCategoryController.get_product_categories_product_category_slug
      )
      .put(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productCategoryController.put_product_categories_product_category_slug
      )
      .delete(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productCategoryController.delete_product_categories_product_category_slug
      );
  }

  public readonly router: Router = Router();
}
