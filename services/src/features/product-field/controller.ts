import { ProductFieldServices } from './services';
import { controllerFactory } from '../../utils/controllers';
import { ImageShape } from '../../utils/zod-shapes';
import { Currency } from '../../types/general';
import { CategoryType } from '../../types/category';
import { getProductFieldNotFoundResponse, getUserNotFoundResponse } from '../../utils/responses';
import { getProductFieldSlugFromField } from './utils';
import { ProductFieldType } from '../../types/product-field';

export class ProductFieldController {
  constructor(private readonly productFields: ProductFieldServices) {}

  get_product_fields = controllerFactory(
    {
      withPagination: true
    },
    async ({ req, res }) => {
      const { paginateOptions } = req;

      const out = await this.productFields.getAllWithPagination({
        paginateOptions,
        query: {}
      });

      res.send(out);
    }
  );

  post_product_fields = controllerFactory(
    {
      bodyShape: (z) => ({
        field: z.string().nonempty(),
        label: z.string().nonempty(),
        description: z.string().optional(),
        type: z.enum(ProductFieldType)
      })
    },
    async ({ req, res }) => {
      const { body } = req;

      const { field, label, type, description } = body;

      const out = await this.productFields.addOne({
        field,
        label,
        type,
        description,
        productFieldSlug: getProductFieldSlugFromField(field)
      });

      res.send(out);
    }
  );

  get_product_fields_product_field_slug = controllerFactory(
    {
      paramsShape: (z) => ({
        productFieldSlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { productFieldSlug } = params;

      const out = await this.productFields.getOne({
        query: {
          productFieldSlug
        }
      });

      if (!out) {
        return getProductFieldNotFoundResponse({ res });
      }

      res.send(out);
    }
  );

  put_product_fields_product_field_slug = controllerFactory(
    {
      paramsShape: (z) => ({
        productFieldSlug: z.string().nonempty()
      }),
      bodyShape: (z) => ({
        label: z.string().nonempty().nullish(),
        description: z.string().nullish()
      })
    },
    async ({ req, res }) => {
      const { params, body } = req;
      const { productFieldSlug } = params;

      const { label, description } = body;

      const out = await this.productFields.findOneAndUpdate({
        query: {
          productFieldSlug
        },
        update: {
          label,
          description
        }
      });

      if (!out) {
        return getProductFieldNotFoundResponse({ res });
      }

      res.send(out);
    }
  );

  delete_product_fields_product_field_slug = controllerFactory(
    {
      paramsShape: (z) => ({
        productFieldSlug: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { params } = req;
      const { productFieldSlug } = params;

      await this.productFields.deleteOne({
        query: {
          productFieldSlug
        }
      });

      res.send({});
    }
  );
}
