import { RequestHandler } from '../../types/general';
import { Access } from '../../types/user';
import { AuthServices } from '../auth/services';
import { userHasSomeAccess, userIsAdmin } from '../../utils/access';
import { get401Response } from '../../utils/responses';
import { getFieldInReqData } from '../../utils/general';
import { ShoppingServices } from '../shopping/services';

export class AccessServices {
  constructor(
    private readonly authServices: AuthServices,
    private readonly shoppingServices: ShoppingServices
  ) {}

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

  middlewareGetUser: RequestHandler = async (req, res, next) => {
    if (req.headers.authorization) {
      return this.middlewareIsLogged(req, res, next);
    }

    next();
  };

  middlewareAccessControl = (args: {
    isAdminWithAccess?: Array<Access>;
    isPurchaserOfThisShopping?: boolean;
    hasBrowserFingerprintOfThisShopping?: boolean;
  }): RequestHandler => {
    return async (req, res, next) => {
      const { user } = req;
      const { isAdminWithAccess, isPurchaserOfThisShopping, hasBrowserFingerprintOfThisShopping } =
        args;
      const shoppingId = getFieldInReqData(req, 'shoppingId');

      const { browserFingerprint } = req;

      /**
       * //////////////////////////////////////////////////////////
       * check if the user is admin with indicated access
       * //////////////////////////////////////////////////////////
       */

      if (
        isAdminWithAccess &&
        userIsAdmin(user)
        // userHasSomeAccess(user, Access.FULL, ...isAdminWithAccess)
      ) {
        return next();
      }

      /**
       * //////////////////////////////////////////////////////////
       * check if the user is a messenger of this shopping
       * //////////////////////////////////////////////////////////
       */

      if (isPurchaserOfThisShopping && shoppingId && user) {
        const existsShopping = await this.shoppingServices.exists({
          query: {
            _id: shoppingId,
            purchaserId: user._id
          }
        });

        if (existsShopping) {
          /**
           * if the user is the purchaser of all these shoppings then the current user has access to this data
           */
          return true;
        }
      }

      if (hasBrowserFingerprintOfThisShopping && shoppingId && browserFingerprint) {
        const existsShopping = await this.shoppingServices.exists({
          query: {
            _id: shoppingId,
            browserFingerprint
          }
        });

        if (existsShopping) {
          /**
           * if the user is the purchaser of all these shoppings then the current user has access to this data
           */
          return true;
        }
      }

      get401Response({ res, json: { message: 'The user has not access to this data' } });
    };
  };
}
