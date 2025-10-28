import { AuthServices } from './services';
import { AuthSessionServices } from '../auth-session/services';
import { UserServices } from '../user/services';
import { UserDtosServices } from '../user-dtos/services';
import { addDays } from 'date-fns';
import { ValidationCodeServices } from '../validation-code/services';
import { EmailServices } from '../email/services';
import { RequestHandler } from '../../types/general';
import { combineMiddleware, getStrongPassword } from '../../utils/general';
import { controllerFactory } from '../../utils/controllers';
import {
  get200Response,
  get201Response,
  get400Response,
  get401Response,
  get404Response,
  getSessionNotFoundResponse,
  getUserNotFoundResponse
} from '../../utils/responses';
import { EmailShape, MongoObjectIdSchema, StrongPasswordSchema } from '../../utils/zod-shapes';
import { AuthSessionState } from '../../types/auth-session';
import { getForgotPasswordCodeRoute, getValidationCodeRoute } from '../../utils/web';
export class AuthController {
  constructor(
    private readonly authServices: AuthServices,
    private readonly authSessionServices: AuthSessionServices,
    private readonly userServices: UserServices,
    private readonly validationCodeServices: ValidationCodeServices,
    private readonly userDtosServices: UserDtosServices,
    private readonly emailServices: EmailServices
  ) {}

  private middlewareAutentication: RequestHandler = (req, res, next) => {
    this.authServices.passportMiddlewareAutenticateLocal((error, user, info) => {
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

  post_signIn = combineMiddleware(
    this.middlewareAutentication,
    controllerFactory({}, async ({ req, res }) => {
      const { user, body, headers } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const accessToken = this.authServices.generateAccessJWT({ id: user._id.toString() });
      const refreshToken = this.authServices.generateRefreshJWT({ id: user._id.toString() });

      await this.authSessionServices.addOne({
        refreshToken,
        userId: user._id,
        descriptionDevice: headers['user-agent']
      });

      /**
       * Get UserData
       */
      const [userDto] = await this.userDtosServices.getUsersDto([user]);

      get200Response({
        res,
        json: {
          steat: this.authServices.steat,
          accessToken,
          refreshToken,
          user: userDto
        }
      });
    })
  );

  post_reset_password = controllerFactory(
    {
      paramsShape: () => ({
        userId: MongoObjectIdSchema
      })
    },
    async ({ req, res }) => {
      const { params } = req;

      const { userId } = params;

      const user = await this.userServices.getOne({
        query: {
          _id: userId
        }
      });

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const password = getStrongPassword();

      user.password = password;

      await user.save();

      get200Response({
        res,
        json: { password }
      });
    }
  );

  post_refresh = controllerFactory(
    {
      bodyShape: (z) => ({
        refreshToken: z.string().nonempty()
      })
    },
    async ({ res, req }) => {
      const { refreshToken } = req.body;

      const currentSession = await this.authSessionServices.getOne({
        query: {
          refreshToken,
          state: AuthSessionState.OPEN
        }
      });

      if (!currentSession) {
        return getSessionNotFoundResponse({ res });
      }

      const { accessToken } = await this.authServices.refreshAccessToken({
        currentSession,
        refreshToken
      });

      if (!accessToken) {
        return get401Response({
          res,
          json: {
            message: 'Error refreshing token'
          }
        });
      }

      get200Response({
        res,
        json: {
          accessToken
        }
      });
    }
  );

  post_signOut = controllerFactory(
    {
      bodyShape: (z) => ({
        refreshToken: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { body } = req;

      const { refreshToken } = body;

      const authSession = await this.authSessionServices.close({ refreshToken });

      if (authSession) {
        await this.userServices.updateOne({
          query: {
            _id: authSession.userId
          },
          update: {
            firebaseToken: null
          }
        });
      }

      return get200Response({
        res,
        json: { message: 'the session was closed successfully' }
      });
    }
  );

  post_signUp = controllerFactory(
    {
      bodyShape: (z) => ({
        name: z.string().nonempty(),
        password: StrongPasswordSchema,
        email: EmailShape
      })
    },
    async ({ req, res }) => {
      const { password, name, email } = req.body;

      const existingUser = await this.userServices.getOne({
        query: {
          email
        }
      });

      if (existingUser) {
        return get400Response({
          res,
          json: {
            message: 'No se pudo crear la cuenta. Puede que ya exista un usuario con esos datos.'
          }
        });
      }

      const newUser = await this.userServices.addOne({
        email,
        name,
        password
      });

      const newValidationCode = await this.validationCodeServices.addValidationCode({
        userId: newUser._id
      });

      const code = newValidationCode.code;

      this.emailServices.send({
        to: email,
        subject: 'Bienvenido a Bravo Caribe',
        text: `De click al siguiente link para validar su cuenta ${getValidationCodeRoute(code)}`
      });

      get201Response({
        res,
        json: { message: 'User registered successfully' }
      });
    }
  );

  post_validate = controllerFactory(
    {
      bodyShape: (z) => ({
        code: z.string().nonempty()
      })
    },
    async ({ req, res }) => {
      const { code } = req.body;

      const validationCode = await this.validationCodeServices.getValidationCode({
        code
      });

      if (!validationCode) {
        return get404Response({
          res,
          json: {
            message: 'Este codigo de validación no existe o ya el usuario fue validado'
          }
        });
      }

      const user = await this.userServices.findOneAndUpdate({
        query: { _id: validationCode.userId },
        update: { validated: true }
      });

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      get201Response({
        res,
        json: { message: 'User validated successfully', email: user.email }
      });
    }
  );

  post_change_password = controllerFactory(
    {
      bodyShape: () => ({
        newPassword: StrongPasswordSchema
      })
    },
    async ({ req, res }) => {
      const { user, body } = req;

      if (!user) {
        return getUserNotFoundResponse({ res });
      }
      const { newPassword } = body;

      const passwordIsDeprecated = await this.authServices.isDeprecatedPassword(user, newPassword);

      if (passwordIsDeprecated) {
        return get400Response({
          res,
          json: {
            message: 'La contraseña ya fue utilizada anteriormente'
          }
        });
      }

      user.password = newPassword;

      //@ts-expect-error ignore
      await user.save();

      get200Response({
        res,
        json: { message: 'password changed successfully' }
      });
    }
  );

  post_forgot_password_validate = controllerFactory(
    {
      bodyShape: (z) => ({
        code: z.string().nonempty(),
        newPassword: StrongPasswordSchema
      })
    },
    async ({ req, res }) => {
      const { code, newPassword } = req.body;

      const validationCode = await this.validationCodeServices.getValidationCode({
        code
      });

      if (!validationCode) {
        return get404Response({
          res,
          json: {
            message: 'Este codigo de validación no existe o ya la cuenta fue recuperada'
          }
        });
      }

      const user = await this.userServices.getOne({
        query: { _id: validationCode.userId }
      });

      if (!user) {
        return getUserNotFoundResponse({ res });
      }

      const passwordIsDeprecated = await this.authServices.isDeprecatedPassword(user, newPassword);

      if (passwordIsDeprecated) {
        return get400Response({
          res,
          json: {
            message: 'La contraseña ya fue utilizada anteriormente'
          }
        });
      }

      user.password = newPassword;

      await user.save();

      await this.validationCodeServices.invalidateValidationCode({
        validationCodeId: validationCode._id
      });

      get201Response({
        res,
        json: {
          message: 'The password was changes successfully',
          email: user.email
        }
      });
    }
  );

  post_forgot_password_request = controllerFactory(
    {
      bodyShape: () => ({
        email: EmailShape
      })
    },
    async ({ req, res }) => {
      const { email } = req.body;

      const user = await this.userServices.getOne({
        query: {
          email
        }
      });

      if (!user) return getUserNotFoundResponse({ res });

      const newValidationCode = await this.validationCodeServices.addValidationCode({
        userId: user._id
      });

      const code = newValidationCode.code;

      if (email) {
        this.emailServices.send({
          to: email,
          subject: 'Recuperando la cuenta en Bravo Caribe',
          text: `De click al siguiente link para recuperar su cuenta en Bravo Caribe ${getForgotPasswordCodeRoute(
            code
          )}`
        });
      }

      get201Response({
        res,
        json: { message: 'Forgot password request sent' }
      });
    }
  );
}
