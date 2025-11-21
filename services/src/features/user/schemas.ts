import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import { User, UserRole } from '../../types/user';
import { createdAtSchemaDefinition, getMongooseModel } from '../../utils/schemas';

let UserModel: ReturnType<typeof getMongooseModel<User>>;

export const modelGetter = () => {
  if (!UserModel) {
    const UserSchema = new Schema<User>({
      ...createdAtSchemaDefinition,
      name: { type: String, required: true },
      email: { type: String, unique: true, required: true },
      password: { type: String, required: true, select: false },
      passwordHistory: [
        {
          password: { type: String, required: true, select: false },
          createdAt: { type: Date, default: Date.now }
        }
      ],
      role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
      validated: { type: Boolean, default: false },
      profileImage: {
        type: {
          _id: false,
          src: { type: String, required: true },
          width: { type: Number, required: true },
          height: { type: Number, required: true }
        },
        default: null
      },
      specialAccess: { type: [String], default: [] }
    });

    const updateUserPassword = (user: User): Promise<void> => {
      return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return reject(err);

          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return reject(err);

            user.password = hash;
            user.passwordHistory.push({ password: hash, createdAt: new Date() });
            resolve();
          });
        });
      });
    };

    UserSchema.pre('save', async function (next) {
      //eslint-disable-next-line
      const user = this;

      if (!user.isModified('password')) {
        return next(); // si no se modificó la contraseña, sigue normalmente
      }

      if (user.password.startsWith('$2b$') || user.password.startsWith('$2a$')) {
        // Ya está hasheado, no volver a hacer hash
        return next();
      }

      try {
        await updateUserPassword(user); // aplica hash y guarda en history
        next(); // continúa después de procesar
      } catch (err: any) {
        next(err); // pasa el error a Mongoose
      }
    });

    UserModel = getMongooseModel<User>(model, 'User', UserSchema, 'users');
  }

  return UserModel;
};
