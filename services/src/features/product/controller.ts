import { ProductServices } from './services';
import { ProductDtosServices } from '../product-dtos/services';
import { controllerFactory } from '../../utils/controllers';
import {
  ArrayOrSingleSchema,
  ImageShape,
  MongoObjectIdSchema,
  QueryBooleanSchema
} from '../../utils/zod-shapes';
import {
  get400Response,
  getProductNotFoundResponse,
  getUserNotFoundResponse
} from '../../utils/responses';
import { Currency } from '../../types/general';
import { GetAllProductArgs } from '../../types/products';
import { ProductCategoryServices } from '../product-category/services';
import { getInArrayQuery } from '../../utils/schemas';
import { isArray } from '../../utils/general';

export class ProductController {
  constructor(
    private readonly productServices: ProductServices,
    private readonly productDtosServices: ProductDtosServices,
    private readonly productCategoryServices: ProductCategoryServices
  ) {}

  get_products = controllerFactory(
    {
      withPagination: true,
      queryShape: (z) => ({
        search: z.string().nullish(),
        featured: QueryBooleanSchema.nullish(),
        categorySlugs: ArrayOrSingleSchema(z.string()).nullish(),
        inStockOnly: QueryBooleanSchema.nullish()
      })
    },
    async ({ req, res }) => {
      const { query, paginateOptions } = req;

      const { search, categorySlugs, inStockOnly, featured } = query;

      const out = await this.productServices.getAllWithPagination({
        paginateOptions,
        query: await (async () => {
          const out: GetAllProductArgs = {
            hidden: false
          };

          if (search) {
            out.search = search;
          }

          if (featured) {
            out.featured = true;
          }

          if (inStockOnly) {
            out.stockAmount = { $gt: 0 };
          }

          if (categorySlugs) {
            const categories = await this.productCategoryServices.getAll({
              query: {
                productCategorySlug: getInArrayQuery(
                  isArray(categorySlugs) ? categorySlugs : [categorySlugs]
                )
              },
              projection: {
                _id: 1
              }
            });

            out.productCategoryIds = getInArrayQuery(categories.map((c) => c._id));
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
        search: z.string().nullish(),
        categorySlugs: ArrayOrSingleSchema(z.string()).nullish()
      })
    },
    async ({ req, res }) => {
      const { query, paginateOptions } = req;

      const { search, categorySlugs } = query;

      const out = await this.productServices.getAllWithPagination({
        paginateOptions,
        query: await (async () => {
          const out: GetAllProductArgs = {};

          if (search) {
            out.search = search;
          }

          if (categorySlugs) {
            const categories = await this.productCategoryServices.getAll({
              query: {
                productCategorySlug: getInArrayQuery(
                  isArray(categorySlugs) ? categorySlugs : [categorySlugs]
                )
              },
              projection: {
                _id: 1
              }
            });

            out.productCategoryIds = getInArrayQuery(categories.map((c) => c._id));
          }

          return out;
        })()
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
        productCategoryIds: z.array(MongoObjectIdSchema).nullish(),
        productFieldsData: z.record(z.string(), z.any()).nullish(),
        offerAmount: z.number().nonnegative().nullish(),
        offerPrice: z.number().nonnegative().nullish()
      })
    },
    async ({ req, res }) => {
      const { user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { body } = req;

      const {
        name,
        hidden,
        images,
        price,
        currency,
        stockAmount,
        productCategoryIds,
        productFieldsData,
        featured,
        offerAmount,
        offerPrice
      } = body;

      const exists = await this.productServices.exists({
        query: { productSlug: this.productServices.getProductSlugFromName(name) }
      });

      if (exists) {
        return get400Response({
          json: { message: 'Ya existe un producto con ese nombre' },
          res
        });
      }

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
        productCategoryIds,
        productFieldsData,
        offerAmount,
        offerPrice
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
        productCategoryIds: z.array(MongoObjectIdSchema).nullish(),
        offerAmount: z.number().nonnegative().nullish(),
        offerPrice: z.number().nonnegative().nullish(),
        productFieldsData: z.record(z.string(), z.any()).nullish()
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
        productCategoryIds,
        productFieldsData,
        featured,
        offerAmount,
        offerPrice
      } = body;

      if (name) {
        const exists = await this.productServices.exists({
          query: {
            $and: [
              { productSlug: { $ne: productSlug } },
              { productSlug: { $eq: this.productServices.getProductSlugFromName(name) } }
            ]
          }
        });

        if (exists) {
          return get400Response({
            json: { message: 'Ya existe un producto con ese nombre' },
            res
          });
        }
      }

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
          productCategoryIds,
          productFieldsData,
          offerAmount,
          offerPrice
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
