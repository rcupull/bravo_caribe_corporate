import { FilterQuery } from 'mongoose';
import { modelGetter } from './schemas';
import { ModelCrudTemplate } from '../../utils/ModelCrudTemplate';
import { AuthSession, AuthSessionState } from '../../types/auth-session';
import { ModelDocument, QueryHandle } from '../../types/general';

export class AuthSessionServices extends ModelCrudTemplate<
  AuthSession,
  Pick<AuthSession, 'refreshToken' | 'userId' | 'descriptionDevice'>,
  FilterQuery<AuthSession>
> {
  constructor() {
    super(modelGetter);
  }

  close: QueryHandle<
    {
      refreshToken: string;
    },
    ModelDocument<AuthSession> | null
  > = async ({ refreshToken }) => {
    const authSession = await this.findOneAndUpdate({
      query: {
        refreshToken,
        state: AuthSessionState.OPEN
      },
      update: {
        $set: {
          state: AuthSessionState.CLOSED,
          closedAt: new Date()
        }
      },
      queryOptions: {
        returnDocument: 'after'
      }
    });

    return authSession;
  };
}
