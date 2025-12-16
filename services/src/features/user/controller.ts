import { UserServices } from './services';
import { UserDtosServices } from '../user-dtos/services';
import { controllerFactory } from '../../utils/controllers';
import { getUserNotFoundResponse } from '../../utils/responses';

export class UserController {
  constructor(
    private readonly userServices: UserServices,
    private readonly userDtosServices: UserDtosServices
  ) {}

  get_users_own = controllerFactory(
    {
      //args
    },
    async ({ req, res }) => {
      const { user } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const response = await this.userServices.getOne({
        query: {
          _id: user._id
        }
      });

      if (!response) {
        return getUserNotFoundResponse({ res });
      }

      const [out] = await this.userDtosServices.getUsersDto([response]);

      res.send(out);
    }
  );

  put_users_own = controllerFactory(
    {
      bodyShape: (z) => ({
        name: z.string().nullish()
      })
    },
    async ({ req, res }) => {
      const { user, body } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const { name } = body;

      const updatedUser = await this.userServices.findOneAndUpdate({
        query: {
          _id: user._id
        },
        update: {
          name
        }
      });

      if (!updatedUser) {
        return getUserNotFoundResponse({ res });
      }

      const [out] = await this.userDtosServices.getUsersDto([updatedUser]);

      res.send(out);
    }
  );

  admin_get_users = controllerFactory(
    {
      withPagination: true,
      queryShape: (z) => ({
        search: z.string().optional()
      })
    },
    async ({ req, res }) => {
      const { paginateOptions, query } = req;
      const { search } = query;

      const out = await this.userServices.getAllWithPagination({
        paginateOptions,
        query: {
          search
        }
      });

      out.data = await this.userDtosServices.getUsersDto(out.data);

      res.send(out);
    }
  );
}
