import { z } from 'zod';
import { ObjectId } from 'mongodb';
import { validateStrongPassword } from './password';

export const MongoObjectIdSchema = z.string().refine((val) => ObjectId.isValid(val));

export const StrongPasswordSchema = z
  .string()
  .nonempty()
  .refine((val) => validateStrongPassword(val));

export const ImageShape = z.object({
  src: z.string().nonempty(),
  width: z.number(),
  height: z.number(),
  href: z.string().optional()
});

export const PhoneShape = z.string().nonempty().regex(/^\d+$/);
export const EmailShape = z.email().nonempty();
export const DateShape = z.iso.datetime();

/**
 * * @description This shape is used to validate and transform the boolean query params in the request. As they usually get to the middleware as value = 'true' instead of value = true
 */
export const QueryBooleanSchema = z
  .union([z.boolean(), z.enum(['true', 'false'])])
  .transform((val) => {
    if (typeof val === 'string') {
      return val === 'true';
    }
    return val;
  });

export const ArrayOrSingleSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.union([schema, z.array(schema)]);
