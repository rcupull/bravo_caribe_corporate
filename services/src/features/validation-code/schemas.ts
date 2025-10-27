import { v4 as uuid } from 'uuid';
import { model, Schema } from 'mongoose';
import { ValidationCode } from '../../types/validation-code';
import { createdAtSchemaDefinition, getMongooseModel } from '../../utils/schemas';

let ValidationCodeModel: ReturnType<typeof getMongooseModel<ValidationCode>>;

export const modelGetter = () => {
  if (!ValidationCodeModel) {
    const ValidationCodeShema = new Schema<ValidationCode>({
      ...createdAtSchemaDefinition,
      code: { type: String, default: () => uuid(), required: true },
      invalidatedAt: { type: Date },
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      meta: { type: Schema.Types.Mixed }
    });

    ValidationCodeModel = getMongooseModel<ValidationCode>(
      model,
      'ValidationCode',
      ValidationCodeShema,
      'validation_codes'
    );
  }

  return ValidationCodeModel;
};
