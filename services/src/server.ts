import express, { Router } from 'express';
import 'express-async-errors';
import { connectDB } from './features/db';
import { CORS_WHITE_LIST, NODE_ENV, RATE_LIMIT_DISABLED, RATE_LIMIT_EXCLUDED_IPS } from './config';
import helmet from 'helmet';

import { logger } from './features/logger';
import { FileServices } from './features/files/services';
import { ProductServices } from './features/product/services';
import { ProductDtosServices } from './features/product-dtos/services';
import { ProductController } from './features/product/controller';
import { ProductRouter } from './features/product/routes';
import { AccessServices } from './features/access/services';
import { middlewareRateLimit } from './middlewares/middlewareRateLimit';
import { middlewareCommaSeparateQuery } from './middlewares/middlewareCommaSeparateQuery';
import { middlewareCorsWhiteList } from './middlewares/middlewareCorsWhiteList';
import { middlewareCorsAll } from './middlewares/middlewareCorsAll';
import { AuthServices } from './features/auth/services';
import { AuthSessionServices } from './features/auth-session/services';
import { UserServices } from './features/user/services';
import { ValidationCodeServices } from './features/validation-code/services';
import { AuthRouter } from './features/auth/routes';
import { AuthController } from './features/auth/controller';
import { UserDtosServices } from './features/user-dtos/services';
import { EmailServices } from './features/email/services';
import { UserController } from './features/user/controller';
import { UserRouter } from './features/user/routes';

export const app = express();
const router = Router();
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const fileServices = new FileServices();
const productServices = new ProductServices();
const authSessionServices = new AuthSessionServices();
const userServices = new UserServices();
const userDtosServices = new UserDtosServices(authSessionServices);
const validationCodeServices = new ValidationCodeServices();
const authServices = new AuthServices(authSessionServices, userServices, validationCodeServices);
const accessServices = new AccessServices(authServices);
const emailServices = new EmailServices();

const productDtosServices = new ProductDtosServices();

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const productController = new ProductController(productServices, productDtosServices);
const authController = new AuthController(
  authServices,
  authSessionServices,
  userServices,
  validationCodeServices,
  userDtosServices,
  emailServices
);

const userController = new UserController(userServices, userDtosServices);

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const productRouter = new ProductRouter(productController, accessServices);
const authRouter = new AuthRouter(authController, accessServices);
const userRouter = new UserRouter(userController, accessServices);

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

router.use('/', productRouter.router, authRouter.router, userRouter.router);

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

connectDB();

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
  app.use(middlewareCorsAll);
} else {
  app.set('trust proxy', 1);

  app.use(
    helmet({
      contentSecurityPolicy: false // Avoid CSP conflicts
    })
  );
  app.disable('x-powered-by');

  app.use(middlewareCorsWhiteList({ CORS_WHITE_LIST, logger }));
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

app.use(
  middlewareRateLimit({
    maxAttempts: 240,
    windowMinutes: 1,
    waitMinutes: 20,
    logger,
    RATE_LIMIT_DISABLED,
    RATE_LIMIT_EXCLUDED_IPS,
    handleCallback: async ({ ip, browserFingerprint }) => {
      const message = `Main: Rate limit exceeded: ${ip} ${browserFingerprint}`;

      logger.error(message);
    }
  })
);

app.use(express.json());
app.use(middlewareCommaSeparateQuery);
app.use(express.urlencoded({ extended: false }));
app.use(router);
