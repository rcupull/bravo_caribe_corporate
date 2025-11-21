import { FilterQuery, Schema } from 'mongoose';
import { modelGetter } from './schemas';
import { ModelCrudTemplate } from '../../utils/ModelCrudTemplate';
import { ValidationCode } from '../../types/validation-code';
import { AnyRecord, QueryHandle } from '../../types/general';
import { v4 as uuid } from 'uuid';
import { getFlattenJson } from '../../utils/general';

export class ValidationCodeServices extends ModelCrudTemplate<
  ValidationCode,
  Pick<ValidationCode, 'userId' | 'code' | 'meta'>,
  FilterQuery<ValidationCode>
> {
  constructor() {
    super(modelGetter);
  }

  addValidationCode: QueryHandle<
    {
      userId: Schema.Types.ObjectId;
      code?: string;
      meta?: AnyRecord;
    },
    ValidationCode
  > = async ({ code, meta, userId }) => {
    const response = await this.addOne({
      code: code || uuid(),
      userId,
      meta
    });

    return response;
  };

  getValidationCode: QueryHandle<
    {
      userId?: Schema.Types.ObjectId;
      code?: string;
    },
    ValidationCode | null
  > = async ({ code, userId }) => {
    const response = await this.getOne({
      query: getFlattenJson({
        code,
        userId,
        $or: [{ invalidatedAt: { $exists: false } }, { invalidatedAt: null }]
      })
    });

    return response;
  };

  invalidateValidationCode: QueryHandle<{
    validationCodeId: Schema.Types.ObjectId;
  }> = async ({ validationCodeId }) => {
    await this.updateOne({
      query: {
        _id: validationCodeId
      },
      update: {
        $set: {
          invalidatedAt: new Date()
        }
      }
    });
  };
}
