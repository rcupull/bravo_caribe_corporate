import { Schema } from 'mongoose';
import { AnyRecord, BaseIdentity } from './general';

export interface ValidationCode extends BaseIdentity {
  code: string;
  invalidatedAt?: Date;
  userId: Schema.Types.ObjectId;
  meta?: AnyRecord;
}
