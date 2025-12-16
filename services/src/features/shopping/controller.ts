import { ShoppingServices } from './services';
import { controllerFactory } from '../../utils/controllers';
import { ArrayOrSingleSchema, MongoObjectIdSchema } from '../../utils/zod-shapes';
import { ShoppingState } from '../../types/shopping';
import { getShoppingNotFoundResponse, getUserNotFoundResponse } from '../../utils/responses';
import { getInArrayQuery } from '../../utils/schemas';

export class ShoppingController {
  constructor(private readonly shoppingServices: ShoppingServices) {}

  get_own_shopping = controllerFactory(
    {
      withPagination: true,
      queryShape: (z) => ({
        states: ArrayOrSingleSchema(z.enum(ShoppingState)).nullish(),
        search: z.string().nullish()
      })
    },
    async ({ req, res }) => {
      const { query, user, paginateOptions } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { states, search } = query;

      const out = await this.shoppingServices.getAllWithPagination({
        paginateOptions,
        query: {
          states,
          purchaserId: user._id,
          search
        }
      });

      res.send(out);
    }
  );

  get_own_shopping_shoppingId = controllerFactory(
    {
      paramsShape: () => ({
        shoppingId: MongoObjectIdSchema
      })
    },
    async ({ req, res }) => {
      const { params, user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { shoppingId } = params;

      const shopping = await this.shoppingServices.getOne({
        query: {
          _id: shoppingId,
          purchaserId: user._id
        }
      });

      if (!shopping) {
        return getShoppingNotFoundResponse({ res });
      }

      res.send(shopping);
    }
  );

  post_admin_shoppings_shoppingId_change_state = controllerFactory(
    {
      paramsShape: () => ({
        shoppingId: MongoObjectIdSchema
      })
    },
    async ({ req, res }) => {
      const { params, user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { shoppingId } = params;

      ////////////////////////////////////////////////////////////////
      /**
       * Getting the shopping
       */
      ////////////////////////////////////////////////////////////////
      let shopping = await this.shoppingServices.getOne({
        query: {
          _id: shoppingId,
          state: getInArrayQuery([ShoppingState.APPROVED, ShoppingState.REQUESTED])
        }
      });

      if (shopping) {
        shopping = this.shoppingServices.changeShoppingState(shopping, ShoppingState.CANCELED);

        await shopping.save();
      }

      res.send({});
    }
  );

  get_admin_shoppings = controllerFactory(
    {
      withPagination: true,
      queryShape: (z) => ({
        states: ArrayOrSingleSchema(z.enum(ShoppingState)).nullish(),
        dateFrom: z.iso.datetime().nullish(),
        dateTo: z.iso.datetime().nullish(),
        search: z.string().nullish()
      })
    },
    async ({ req, res }) => {
      const { query, paginateOptions } = req;

      const { states, dateFrom, dateTo, search } = query;

      const out = await this.shoppingServices.getAllWithPagination({
        paginateOptions,
        query: {
          states,
          dateFrom,
          dateTo,
          search
        }
      });

      res.send(out);
    }
  );
}
