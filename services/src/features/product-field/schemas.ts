import { model, Schema } from 'mongoose';
import { getMongooseModel } from '../../utils/schemas';
import { ProductField, ProductFieldType } from '../../types/product-field';

let ProductFieldModel: ReturnType<typeof getMongooseModel<ProductField>>;

export const modelGetter = () => {
  if (!ProductFieldModel) {
    const ProductFieldSchema = new Schema<ProductField>(
      {
        field: {
          type: String,
          required: true,
          unique: true
        },
        type: {
          type: String,
          enum: Object.values(ProductFieldType),
          required: true,
          default: ProductFieldType.string
        },
        label: { type: String, required: true },
        productFieldSlug: { type: String, required: true, unique: true }
      },
      {
        timestamps: true,
        versionKey: false
      }
    );

    ProductFieldModel = getMongooseModel<ProductField>(
      model,
      'ProductField',
      ProductFieldSchema,
      'product_fields'
    );
  }

  return ProductFieldModel;
};
