import { RequestHandler as ExpressRequestHandler } from 'express';
import { User as UserApp } from './user';

import {
  ApplySchemaOptions,
  DefaultSchemaOptions,
  ObtainDocumentType,
  PaginateOptions,
  ResolveSchemaOptions,
  Schema
} from 'mongoose';

import { Document } from 'mongoose';

export enum Currency {
  MLC = 'MLC',
  CUP = 'CUP',
  USD = 'USD'
}

export type AnyRecord = Record<string, any>;
export type UnknownRecord = Record<string, unknown>;

declare global {
  namespace Express {
    interface User extends UserApp {}
    interface Request {
      user?: UserApp;
      paginateOptions?: PaginateOptions;
      browserFingerprint?: string;
    }
  }
}

export interface BaseIdentity {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
}

export interface RequestHandler<
  P = AnyRecord,
  ResBody = any,
  ReqBody = any,
  ReqQuery = AnyRecord,
  Locals extends Record<string, any> = Record<string, any>
> extends ExpressRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}

export type QueryHandle<Args extends AnyRecord | void = void, R = void> = (
  args: Args
) => Promise<R>;

export interface Image {
  src: string;
  width: number;
  height: number;
  href?: string;
}

export type SchemaDefinition<Type = any> = ApplySchemaOptions<
  ObtainDocumentType<any, Type, ResolveSchemaOptions<DefaultSchemaOptions>>,
  ResolveSchemaOptions<DefaultSchemaOptions>
>;

type EmptyObject<T> = { [K in keyof T]?: never };
export type EmptyObjectOf<T> = EmptyObject<T> extends T ? EmptyObject<T> : never;

export type Nullable<T> = T | false | null | undefined;

export type ModelDocument<T extends AnyRecord = AnyRecord> = Document<unknown, AnyRecord, T> & T;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
type JSONObject = AnyRecord | Array<any>;
type JSONObjectKey = string | number;

// nesting paths inline
type JoinPathsInline<K, P> = K extends JSONObjectKey
  ? P extends string
    ? `${K}.${P}`
    : never
  : never;

//eslint-disable-next-line
export type Path<T extends any, D extends number = 5> = D extends never
  ? never
  : T extends JSONObject
    ? {
        [K in keyof T]-?: K extends JSONObjectKey
          ? `${K}` | JoinPathsInline<K, Path<T[K], Prev[D]>>
          : never;
      }[keyof T]
    : never;

export type QuerySelectType<T extends AnyRecord = AnyRecord> = Partial<Record<keyof T, true>>;

export type CreatedDateRangeQueryType = {
  createdAt: {
    $gte?: Date;
    $lt?: Date;
  };
};
