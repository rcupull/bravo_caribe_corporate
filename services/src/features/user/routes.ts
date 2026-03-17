import { Router } from 'express';

import { UserController } from './controller';

import { AccessServices } from '../access/services';
import { Access } from '../../types/user';

export class UserRouter {
  constructor(
    private readonly userController: UserController,
    private readonly accessServices: AccessServices
  ) {
    this.router
      .route('/users/own')
      .get(this.accessServices.middlewareIsLogged, this.userController.get_users_own)
      .put(this.accessServices.middlewareIsLogged, this.userController.put_users_own);

    this.router.route('/users').get(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.userController.get_users
    );

    this.router.route('/users/:userId').put(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.userController.put_users_userId
    );
  }

  public readonly router: Router = Router();
}
