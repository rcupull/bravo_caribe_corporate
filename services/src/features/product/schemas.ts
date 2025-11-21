import { model, Schema } from 'mongoose';
import { Currency } from '../../types/general';
import { Product } from '../../types/products';
import { createdAtSchemaDefinition, getMongooseModel } from '../../utils/schemas';
import { CategoryType } from '../../types/category';

let ProductModel: ReturnType<typeof getMongooseModel<Product>>;

export const modelGetter = () => {
  if (!ProductModel) {
    const ProductSchema = new Schema<Product>({
      ...createdAtSchemaDefinition,
      description: { type: String },
      details: { type: String },
      hidden: { type: Boolean, default: false },
      createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
      productSlug: { type: String, required: true, unique: true },
      //
      price: { type: Number, required: true },
      inStock: { type: Boolean },
      currency: { type: String, enum: Object.values(Currency), required: true },

      categoryType: { type: String, enum: Object.values(CategoryType) },
      specs: { type: Schema.Types.Mixed }
    });

    ProductModel = getMongooseModel<Product>(model, 'Product', ProductSchema, 'products');
  }

  return ProductModel;
};
