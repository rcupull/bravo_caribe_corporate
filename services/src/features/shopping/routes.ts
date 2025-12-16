import { Router } from 'express';

import { ShoppingController } from './controller';

import { AccessServices } from '../access/services';
import { Access } from '../../types/user';

/////////////////////////////////////////////////////////////////

export class ShoppingRouter {
  constructor(
    private readonly shoppingController: ShoppingController,
    private readonly accessServices: AccessServices
  ) {
    this.router
      .route('/own/shopping')
      .get(this.accessServices.middlewareIsLogged, this.shoppingController.get_own_shopping);

    this.router.route('/admin/shopping/:shoppingId/change-state').post(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.shoppingController.post_admin_shoppings_shoppingId_change_state
    );

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    this.router.route('/admin/shoppings').get(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.shoppingController.get_admin_shoppings
    );
  }

  public readonly router: Router = Router();
}
