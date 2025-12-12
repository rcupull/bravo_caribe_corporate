import { ProductServices } from './services';
import { ProductDtosServices } from '../product-dtos/services';
import { controllerFactory } from '../../utils/controllers';
import { ImageShape, QueryBooleanSchema } from '../../utils/zod-shapes';
import { getProductNotFoundResponse, getUserNotFoundResponse } from '../../utils/responses';
import { Currency } from '../../types/general';
import { CategoryType } from '../../types/category';
import { GetAllProductArgs } from '../../types/products';

export class ProductController {
  constructor(
    private readonly productServices: ProductServices,
    private readonly productDtosServices: ProductDtosServices
  ) {}

  get_products = controllerFactory(
    {
      withPagination: true,
      queryShape: (z) => ({
        search: z.string().nullish(),
        featured: QueryBooleanSchema.nullish(),
        categoryType: z.enum(CategoryType).nullish()
      })
    },
    async ({ req, res }) => {
      const { query, paginateOptions } = req;

      const { search, categoryType, featured } = query;

      const out = await this.productServices.getAllWithPagination({
        paginateOptions,
        query: (() => {
          const out: GetAllProductArgs = {
            hidden: false
          };

          if (search) {
            out.search = search;
          }

          if (featured) {
            out.featured = true;
          }

          if (categoryType) {
            out.categoryType = categoryType;
          }

          return out;
        })()
      });

      res.send({
        ...out,
        data: await this.productDtosServices.getProductsDto(out.data)
      });
    }
  );

  get_products_productSlug = controllerFactory(
    {
      paramsShape: (z) => ({
        productSlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { productSlug } = params;

      const product = await this.productServices.getOne({
        query: {
          productSlug
        }
      });

      if (!product) {
        return getProductNotFoundResponse({ res });
      }

      const [out] = await this.productDtosServices.getProductsDto([product]);

      res.send(out);
    }
  );

  admin_get_products = controllerFactory(
    {
      withPagination: true,
      queryShape: (z) => ({
        search: z.string().nullish()
      })
    },
    async ({ req, res }) => {
      const { query, paginateOptions } = req;

      const { search } = query;

      const out = await this.productServices.getAllWithPagination({
        paginateOptions,
        query: {
          search
        }
      });

      out.data = await this.productDtosServices.getProductsAdminDto(out.data);

      res.send(out);
    }
  );

  admin_post_products = controllerFactory(
    {
      bodyShape: (z) => ({
        name: z.string().nonempty(),
        hidden: z.boolean().optional(),
        stockAmount: z.number().optional(),
        featured: z.boolean().optional(),
        images: z.array(ImageShape).optional(),
        price: z.number().nonnegative(),
        currency: z.enum(Currency),
        categoryType: z.enum(CategoryType).nullish(),
        specs: z.record(z.string(), z.any()).nullish()
      })
    },
    async ({ req, res }) => {
      const { user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { body } = req;

      const { name, hidden, images, price, currency, stockAmount, categoryType, specs, featured } =
        body;

      const out = await this.productServices.addOne({
        name,
        productSlug: this.productServices.getProductSlugFromName(name),
        hidden,
        currency,
        images,
        stockAmount,
        price,
        featured,
        createdBy: user._id,
        categoryType,
        specs
      });

      res.send(out);
    }
  );

  admin_get_products_productSlug = controllerFactory(
    {
      paramsShape: (z) => ({
        productSlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { productSlug } = params;

      const product = await this.productServices.getOne({
        query: {
          productSlug
        }
      });

      if (!product) {
        return getProductNotFoundResponse({ res });
      }

      const [out] = await this.productDtosServices.getProductsAdminDto([product]);

      res.send(out);
    }
  );

  admin_put_products_productSlug = controllerFactory(
    {
      paramsShape: (z) => ({
        productSlug: z.string().nonempty()
      }),
      bodyShape: (z) => ({
        images: z.array(ImageShape).nullish(),
        name: z.string().nullish(),
        price: z.number().nonnegative().nullish(),
        stockAmount: z.number().nullish(),
        featured: z.boolean().nullish(),
        currency: z.enum(Currency).nullish(),
        hidden: z.boolean().optional(),
        categoryType: z.enum(CategoryType).nullish(),
        specs: z.record(z.string(), z.any()).nullish()
      })
    },
    async ({ req, res, next }) => {
      const { params, body } = req;
      const { productSlug, routeName } = params;

      const {
        highlights,
        images,
        name,
        price,
        currency,
        hidden,
        stockAmount,
        categoryType,
        specs,
        featured
      } = body;

      const out = await this.productServices.findOneAndUpdate({
        query: {
          productSlug,
          routeName
        },
        update: {
          highlights,
          stockAmount,
          images,
          name,
          featured,
          ...(name ? { productSlug: this.productServices.getProductSlugFromName(name) } : {}),
          price,
          currency,
          hidden,
          categoryType,
          specs
        }
      });

      // always exists
      req.params.productSlug = out?.productSlug || 'wrong productSlug';

      this.admin_get_products_productSlug(req, res, next);
    }
  );

  admin_delete_products_productSlug = controllerFactory(
    {
      paramsShape: (z) => ({
        productSlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { productSlug } = params;

      await this.productServices.deleteOne({
        query: {
          productSlug
        }
      });

      res.send({});
    }
  );
}
