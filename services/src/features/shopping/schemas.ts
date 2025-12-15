import { model } from 'mongoose';

import { getShoppingCode } from './utils';
import { Schema } from 'mongoose';
import { Shopping, ShoppingState } from '../../types/shopping';
import { createdAtSchemaDefinition, getMongooseModel } from '../../utils/schemas';
import { Currency } from '../../types/general';

let ShoppingModel: ReturnType<typeof getMongooseModel<Shopping>>;

export const modelGetter = () => {
  if (!ShoppingModel) {
    const shoppingState = {
      type: String,
      enum: Object.values(ShoppingState),
      required: true
    };

    const ShoppingSchema = new Schema<Shopping>({
      ...createdAtSchemaDefinition,
      products: {
        type: [
          {
            _id: false,
            productData: {
              type: {
                _id: { type: String, required: true },
                images: {
                  type: [
                    {
                      src: { type: String, required: true },
                      width: { type: Number, required: true },
                      height: { type: Number, required: true }
                    }
                  ]
                },
                name: { type: String, required: true },
                price: { type: Number, required: true },
                currency: { type: String, enum: Object.values(Currency) }
              },
              required: true
            },
            count: { type: Number, required: true }
          }
        ]
      },
      purchaserId: { type: Schema.Types.ObjectId, ref: 'User' },
      browserFingerprint: { type: String, select: false },
      //
      code: { type: String, required: true, default: getShoppingCode },
      state: {
        type: String,
        enum: Object.values(ShoppingState),
        required: true
      },
      history: {
        type: [
          {
            _id: false,
            state: shoppingState,
            lastUpdatedDate: { type: Date }
          }
        ]
      }
    });

    ShoppingModel = getMongooseModel<Shopping>(model, 'Shopping', ShoppingSchema, 'shopping');
  }

  return ShoppingModel;
};
