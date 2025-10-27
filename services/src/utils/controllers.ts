import { AnyRecord, RequestHandler } from '../types/general';
import { NextFunction, Request, Response } from 'express';
import { combineMiddleware } from './general';
import { middlewarePagination } from '../middlewares/middlewarePagination';
import { z } from 'zod';
import { get400Response, get500Response } from './responses';

type Req = Request<AnyRecord, any, any, AnyRecord>;
type Res = Response<any>;

type ControllerCallback = (args: { req: Req; res: Res; next: NextFunction }) => Promise<any> | any;

export interface ControllerArgs {
  withPagination?: boolean;
  paramsShape?: (arg: typeof z) => z.ZodRawShape;
  bodyShape?: (arg: typeof z) => z.ZodRawShape;
  queryShape?: (arg: typeof z) => z.ZodRawShape;
}

const validateObject = (args: {
  data: AnyRecord;
  schema?: z.ZodSchema<AnyRecord>;
}): AnyRecord | z.ZodError => {
  const { data, schema } = args;

  if (schema) {
    const result = schema.safeParse(data);
    return result.success ? result.data : result.error;
  }

  return data;
};

export const controllerFactory = (
  args: ControllerArgs,
  callback: ControllerCallback
): RequestHandler => {
  const { bodyShape, paramsShape, queryShape, withPagination } = args;

  let out: RequestHandler = async (req, res, next) => {
    const { originalUrl, method } = req;
    const serviceTag = `${method}-${originalUrl}`;

    try {
      const body = validateObject({
        data: req.body,
        schema: bodyShape && z.object(bodyShape(z))
      });

      const params = validateObject({
        data: req.params,
        schema: paramsShape && z.object(paramsShape(z))
      });

      const query = validateObject({
        data: req.query,
        schema: queryShape && z.object(queryShape(z))
      });

      if (
        body instanceof z.ZodError ||
        params instanceof z.ZodError ||
        query instanceof z.ZodError
      ) {
        return get400Response({
          res,
          json: {
            message: `Field validation failed in ${serviceTag}`
          }
        });
      } else {
        req.body = body;
        req.params = params;
        req.query = query;
      }

      await callback({ req, res, next });
    } catch (error) {
      get500Response({
        res,
        json: { error: `Error: ${serviceTag}` }
      });
    }
  };

  if (withPagination) {
    out = combineMiddleware(middlewarePagination, out);
  }

  return out;
};
