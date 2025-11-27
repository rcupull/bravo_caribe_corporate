import { BlogServices } from './services';
import { controllerFactory } from '../../utils/controllers';
import { ImageShape } from '../../utils/zod-shapes';
import { getBlogNotFoundResponse, getUserNotFoundResponse } from '../../utils/responses';
import { BlogDtosServices } from '../blog-dtos/services';
import { GetAllBlogsArgs } from '../../types/blog';

export class BlogController {
  constructor(
    private readonly blogServices: BlogServices,
    private readonly blogDtosServices: BlogDtosServices
  ) {}

  get_blogs = controllerFactory(
    {
      withPagination: true,
      queryShape: (z) => ({
        search: z.string().nullish()
      })
    },
    async ({ req, res }) => {
      const { query, paginateOptions } = req;

      const { search } = query;

      const out = await this.blogServices.getAllWithPagination({
        paginateOptions,
        query: (() => {
          const out: GetAllBlogsArgs = {
            hidden: false
          };

          if (search) {
            out.search = search;
          }

          return out;
        })()
      });

      res.send({
        ...out,
        data: await this.blogDtosServices.getBlogsDto(out.data)
      });
    }
  );

  get_blogs_blogSlug = controllerFactory(
    {
      paramsShape: (z) => ({
        blogSlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { blogSlug } = params;

      const blog = await this.blogServices.getOne({
        query: {
          blogSlug
        }
      });

      if (!blog) {
        return getBlogNotFoundResponse({ res });
      }

      const [out] = await this.blogDtosServices.getBlogsDto([blog]);

      res.send(out);
    }
  );

  admin_get_blogs = controllerFactory(
    {
      withPagination: true,
      queryShape: (z) => ({
        search: z.string().nullish()
      })
    },
    async ({ req, res }) => {
      const { query, paginateOptions } = req;

      const { search } = query;

      const out = await this.blogServices.getAllWithPagination({
        paginateOptions,
        query: {
          search
        }
      });

      out.data = await this.blogDtosServices.getBlogsAdminDto(out.data);

      res.send(out);
    }
  );

  admin_post_blogs = controllerFactory(
    {
      bodyShape: (z) => ({
        title: z.string().nonempty(),
        description: z.string().optional(),
        message: z.string().optional(),
        hidden: z.boolean().optional(),
        coverImage: ImageShape.optional()
      })
    },
    async ({ req, res }) => {
      const { user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { body } = req;

      const { title, coverImage, description, message, hidden } = body;

      const out = await this.blogServices.addOne({
        title,
        blogSlug: this.blogServices.getBlogSlugFromName(title),
        hidden,
        coverImage,
        description,
        message
      });

      res.send(out);
    }
  );

  admin_get_blogs_blogSlug = controllerFactory(
    {
      paramsShape: (z) => ({
        blogSlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { blogSlug } = params;

      const blog = await this.blogServices.getOne({
        query: {
          blogSlug
        }
      });

      if (!blog) {
        return getBlogNotFoundResponse({ res });
      }

      const [out] = await this.blogDtosServices.getBlogsAdminDto([blog]);

      res.send(out);
    }
  );

  admin_put_blogs_blogSlug = controllerFactory(
    {
      paramsShape: (z) => ({
        blogSlug: z.string().nonempty()
      }),
      bodyShape: (z) => ({
        title: z.string().nonempty().nullish(),
        description: z.string().nonempty().nullish(),
        message: z.string().nonempty().nullish(),
        hidden: z.boolean().nullish(),
        coverImage: ImageShape.nullish()
      })
    },
    async ({ req, res, next }) => {
      const { params, body } = req;
      const { blogSlug, routeName } = params;

      const { title, coverImage, description, message, hidden } = body;

      const out = await this.blogServices.findOneAndUpdate({
        query: {
          blogSlug,
          routeName
        },
        update: {
          title,
          ...(title ? { blogSlug: this.blogServices.getBlogSlugFromName(title) } : {}),
          hidden,
          coverImage,
          description,
          message
        }
      });

      // always exists
      req.params.blogSlug = out?.blogSlug || 'wrong blogSlug';

      this.admin_get_blogs_blogSlug(req, res, next);
    }
  );

  admin_delete_blogs_blogSlug = controllerFactory(
    {
      paramsShape: (z) => ({
        blogSlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { blogSlug } = params;

      await this.blogServices.deleteOne({
        query: {
          blogSlug
        }
      });

      res.send({});
    }
  );
}
