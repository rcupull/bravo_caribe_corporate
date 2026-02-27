import { model, Schema } from 'mongoose';
import { createdAtSchemaDefinition, getMongooseModel } from '../../utils/schemas';
import { ProductCategory } from '../../types/product-category';

let ProductCategoryModel: ReturnType<typeof getMongooseModel<ProductCategory>>;

export const modelGetter = () => {
  if (!ProductCategoryModel) {
    const ProductCategorySchema = new Schema<ProductCategory>({
      ...createdAtSchemaDefinition,
      description: { type: String },
      name: { type: String, required: true, unique: true },
      productFieldIds: [{ type: Schema.Types.ObjectId, ref: 'ProductField' }],
      productCategorySlug: { type: String, required: true, unique: true }
    });

    ProductCategoryModel = getMongooseModel<ProductCategory>(
      model,
      'ProductCategory',
      ProductCategorySchema,
      'product_categories'
    );
  }

  return ProductCategoryModel;
};
