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

    this.router.route('/own/shopping/:shoppingId').get(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isPurchaserOfThisShopping: true
      }),
      this.shoppingController.get_own_shopping_shoppingId
    );

    this.router.route('/shopping/:shoppingId/changeToApproved').post(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.shoppingController.post_shopping_shoppingId_change_to_approved
    );

    this.router.route('/shopping/:shoppingId/changeToCancelled').post(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isPurchaserOfThisShopping: true
      }),
      this.shoppingController.post_shopping_shoppingId_change_to_cancelled
    );

    this.router.route('/shopping/:shoppingId/changeToReadyToDelivery').post(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.shoppingController.post_shopping_shoppingId_change_to_ready_to_delivery
    );

    this.router.route('/shopping/:shoppingId/changeToRejected').post(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.shoppingController.post_shopping_shoppingId_change_to_rejected
    );

    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////

    this.router.route('/shopping').get(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.shoppingController.get_shopping
    );
  }

  public readonly router: Router = Router();
}
