import { Router } from 'express';

import { UserController } from './controller';

import { AccessServices } from '../access/services';

export class UserRouter {
  constructor(
    private readonly userController: UserController,
    private readonly accessServices: AccessServices
  ) {
    this.router
      .route('/users/own')
      .get(this.accessServices.middlewareIsLogged, this.userController.get_users_own)
      .put(this.accessServices.middlewareIsLogged, this.userController.put_users_own);
  }

  public readonly router: Router = Router();
}
