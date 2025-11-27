import { model, Schema } from 'mongoose';
import { createdAtSchemaDefinition, getMongooseModel } from '../../utils/schemas';
import { Blog } from '../../types/blog';

let BlogModel: ReturnType<typeof getMongooseModel<Blog>>;

export const modelGetter = () => {
  if (!BlogModel) {
    const BlogSchema = new Schema<Blog>({
      ...createdAtSchemaDefinition,
      title: { type: String, required: true },
      blogSlug: { type: String, required: true, unique: true },
      hidden: { type: Boolean, default: false },
      coverImage: {
        type: {
          src: { type: String, required: true },
          width: { type: Number, required: true },
          height: { type: Number, required: true }
        }
      },
      description: { type: String },
      message: { type: String },
      author: { type: String },
      featured: { type: Boolean, default: false }
    });

    BlogModel = getMongooseModel<Blog>(model, 'Blog', BlogSchema, 'blogs');
  }

  return BlogModel;
};
