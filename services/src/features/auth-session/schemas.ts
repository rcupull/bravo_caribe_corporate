import { model, Schema } from 'mongoose';
import { AuthSession, AuthSessionState } from '../../types/auth-session';
import { createdAtSchemaDefinition, getMongooseModel } from '../../utils/schemas';

let AuthSessionModel: ReturnType<typeof getMongooseModel<AuthSession>>;

export const modelGetter = () => {
  if (!AuthSessionModel) {
    const AuthSessionShema = new Schema<AuthSession>({
      ...createdAtSchemaDefinition,
      refreshToken: { type: String, required: true, unique: true },
      descriptionDevice: { type: String, required: true },
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      refreshHistory: { type: [Date], default: [] },
      state: {
        type: String,
        enum: Object.values(AuthSessionState),
        default: AuthSessionState.OPEN,
        required: true
      },
      closedAt: { type: Date },
      firebaseToken: { type: String, select: false }
    });

    AuthSessionModel = getMongooseModel<AuthSession>(
      model,
      'AuthSession',
      AuthSessionShema,
      'auth_sessions'
    );
  }

  return AuthSessionModel;
};
