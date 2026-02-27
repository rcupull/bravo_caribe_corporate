import { controllerFactory } from '../../utils/controllers';
import { getProductCategoryNotFoundResponse } from '../../utils/responses';
import { MongoObjectIdSchema } from '../../utils/zod-shapes';
import { ProductCategoryDtosServices } from '../product-category-dtos/services';
import { ProductCategoryServices } from './services';
import { getProductCategorySlugFromName } from './utils';

export class ProductCategoryController {
  constructor(
    private readonly productCategoryServices: ProductCategoryServices,
    private readonly productCategoryDtosServices: ProductCategoryDtosServices
  ) {}

  get_product_categories = controllerFactory(
    {
      withPagination: true
    },
    async ({ req, res }) => {
      const { paginateOptions } = req;

      const out = await this.productCategoryServices.getAllWithPagination({
        paginateOptions,
        query: {}
      });

      res.send({
        ...out,
        data: await this.productCategoryDtosServices.getProductsCategoryDto(out.data)
      });
    }
  );

  post_product_categories = controllerFactory(
    {
      bodyShape: (z) => ({
        description: z.string().optional(),
        name: z.string().nonempty(),
        productFieldIds: z.array(MongoObjectIdSchema).optional()
      })
    },
    async ({ req, res }) => {
      const { body } = req;

      const { description, name, productFieldIds, type } = body;

      const out = await this.productCategoryServices.addOne({
        description,
        name,
        productFieldIds,
        productCategorySlug: getProductCategorySlugFromName(name)
      });

      res.send(out);
    }
  );

  get_product_categories_product_category_slug = controllerFactory(
    {
      paramsShape: (z) => ({
        productCategorySlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { productCategorySlug } = params;

      const out = await this.productCategoryServices.getOne({
        query: {
          productCategorySlug
        }
      });

      if (!out) {
        return getProductCategoryNotFoundResponse({ res });
      }

      res.send(out);
    }
  );

  put_product_categories_product_category_slug = controllerFactory(
    {
      paramsShape: (z) => ({
        productCategorySlug: z.string().nonempty()
      }),
      bodyShape: (z) => ({
        description: z.string().nullish(),
        name: z.string().nullish(),
        productFieldIds: z.array(MongoObjectIdSchema).nullish()
      })
    },
    async ({ req, res }) => {
      const { params, body } = req;
      const { productCategorySlug } = params;

      const { description, name, productFieldIds } = body;

      const out = await this.productCategoryServices.findOneAndUpdate({
        query: {
          productCategorySlug
        },
        update: {
          description,
          name,
          productFieldIds
        }
      });

      if (!out) {
        return getProductCategoryNotFoundResponse({ res });
      }

      res.send(out);
    }
  );

  delete_product_categories_product_category_slug = controllerFactory(
    {
      paramsShape: (z) => ({
        productCategorySlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { productCategorySlug } = params;

      await this.productCategoryServices.deleteOne({
        query: {
          productCategorySlug
        }
      });

      res.send({});
    }
  );
}
