import { Router } from 'express';

import { AuthController } from './controller';
import { AccessServices } from '../access/services';
import { Access } from '../../types/user';

export class AuthRouter {
  constructor(
    private readonly authController: AuthController,
    private readonly accessServices: AccessServices
  ) {
    this.router.route('/auth/sign-in').post(this.authController.post_signIn);

    this.router.route('/auth/refresh').post(this.authController.post_refresh);
    /////////////////////////////////////////////////////////////////

    this.router.route('/auth/sign-out').post(this.authController.post_signOut);
    /////////////////////////////////////////////////////////////////

    this.router.route('/auth/sign-up').post(this.authController.post_signUp);

    this.router.route('/auth/validate').post(this.authController.post_validate);

    this.router
      .route('/auth/forgot-password-request')
      .post(this.authController.post_forgot_password_request);

    this.router
      .route('/auth/forgot-password-validate')
      .post(this.authController.post_forgot_password_validate);

    this.router
      .route('/auth/change-password')
      .post(this.accessServices.middlewareIsLogged, this.authController.post_change_password);

    this.router.route('/auth/reset-password/:userId').post(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.authController.post_reset_password
    );
  }

  public readonly router: Router = Router();
}
