import { Schema } from 'mongoose';
import { BaseIdentity } from './general';

export enum AuthSessionState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export interface AuthSession extends BaseIdentity {
  refreshToken: string;
  descriptionDevice: string | undefined;
  userId: Schema.Types.ObjectId;
  refreshHistory: Array<Date>;
  state: AuthSessionState;
  closedAt?: Date;
  firebaseToken?: string;
}
