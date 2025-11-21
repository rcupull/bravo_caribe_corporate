import { Router } from 'express';
import { FileController } from './controller';
import { AccessServices } from '../access/services';
import { Access } from '../../types/user';

export class FileRouter {
  constructor(
    private readonly fileController: FileController,
    private readonly accessServices: AccessServices
  ) {
    this.router.route('/admin/images/products').post(
      this.accessServices.middlewareIsLogged,
      this.accessServices.middlewareAccessControl({
        isAdminWithAccess: [Access.FULL]
      }),
      this.fileController.post_image_products
    );
  }

  public readonly router: Router = Router();
}
