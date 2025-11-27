import { Router } from 'express';

import { BlogController } from './controller';

import { AccessServices } from '../access/services';
import { Access } from '../../types/user';

export class BlogRouter {
  constructor(
    private readonly blogController: BlogController,
    private readonly accessServices: AccessServices
  ) {
    this.router
      .route('/admin/blogs')
      .get(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.blogController.admin_get_blogs
      )
      .post(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.blogController.admin_post_blogs
      );

    /**
     * ////////////////////////////////////////////////////////////////////////////////////////////////////
     */

    this.router
      .route('/admin/blogs/:blogSlug')
      .get(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.blogController.admin_get_blogs_blogSlug
      )
      .put(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.blogController.admin_put_blogs_blogSlug
      )
      .delete(
        this.accessServices.middlewareIsLogged,
        this.accessServices.middlewareAccessControl({
          isAdminWithAccess: [Access.FULL]
        }),
        this.blogController.admin_delete_blogs_blogSlug
      );

    this.router.route('/blogs').get(this.blogController.get_blogs);

    this.router.route('/blogs/:blogSlug').get(this.blogController.get_blogs_blogSlug);
  }

  public readonly router: Router = Router();
}
