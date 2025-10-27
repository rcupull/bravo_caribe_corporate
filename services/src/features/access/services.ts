import { RequestHandler } from '../../types/general';
import { Access } from '../../types/user';
import { AuthServices } from '../auth/services';
import { userHasSomeAccess, userIsAdmin } from '../../utils/access';
import { get401Response } from '../../utils/responses';

export class AccessServices {
  constructor(private readonly authServices: AuthServices) {}

  middlewareIsLogged: RequestHandler = (req, res, next) => {
    this.authServices.passportMiddlewareAutenticateJWT((error, user, info) => {
      if (error) return next(error);

      if (!user) {
        //@ts-expect-error ignore
        const message = info?.message as string | undefined;

        return res.status(401).send({
          message: message || 'Error en la autenticación.'
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  };

  middlewareAccessControl = (args: { isAdminWithAccess?: Array<Access> }): RequestHandler => {
    return async (req, res, next) => {
      const { user } = req;
      const { isAdminWithAccess } = args;

      /**
       * //////////////////////////////////////////////////////////
       * check if the user is admin with indicated access
       * //////////////////////////////////////////////////////////
       */

      if (
        isAdminWithAccess &&
        userIsAdmin(user) &&
        userHasSomeAccess(user, Access.FULL, ...isAdminWithAccess)
      ) {
        return next();
      }

      get401Response({ res, json: { message: 'The user has not access to this data' } });
    };
  };
}
