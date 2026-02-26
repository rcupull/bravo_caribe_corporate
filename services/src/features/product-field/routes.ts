import { Router } from 'express';

import { AccessServices } from '../access/services';
import { Access } from '../../types/user';
import { ProductFieldController } from './controller';

export class ProductFieldRouter {
  constructor(
    private readonly productFieldController: ProductFieldController,
    private readonly accessServices: AccessServices
  ) {
    this.router
      .route('/product-fields')
      .get(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productFieldController.get_product_fields
      )
      .post(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productFieldController.post_product_fields
      );

    /**
     * ////////////////////////////////////////////////////////////////////////////////////////////////////
     */

    this.router
      .route('/product-fields/:productFieldSlug')
      .get(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productFieldController.get_product_fields_product_field_slug
      )
      .put(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productFieldController.put_product_fields_product_field_slug
      )
      .delete(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.productFieldController.delete_product_fields_product_field_slug
      );
  }

  public readonly router: Router = Router();
}
