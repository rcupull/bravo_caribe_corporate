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

export const app = express();
const router = Router();
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const fileServices = new FileServices();
const productServices = new ProductServices();
const authSessionServices = new AuthSessionServices();
const userServices = new UserServices();
const validationCodeServices = new ValidationCodeServices();
const authServices = new AuthServices(authSessionServices, userServices, validationCodeServices);
const accessServices = new AccessServices(authServices);

const productDtosServices = new ProductDtosServices();

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const productController = new ProductController(productServices, productDtosServices);

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const productRouter = new ProductRouter(productController, accessServices);

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

router.use('/', productRouter.router);

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
