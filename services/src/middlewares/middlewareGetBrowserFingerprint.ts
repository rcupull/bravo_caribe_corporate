import { RequestHandler } from '../types/general';
import { isString } from '../utils/general';

export const middlewareGetBrowserFingerprint: RequestHandler = async (req, res, next) => {
  if (isString(req.headers.browserfingerprint)) {
    req['browserFingerprint'] = req.headers.browserfingerprint;
  }

  next();
};
