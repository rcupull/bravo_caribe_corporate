import { modelGetter } from './schemas';
import { getAllFilterQuery } from './utils';
import { GetAllUsersArgs, User } from '../../types/user';
import { ModelCrudTemplate } from '../../utils/ModelCrudTemplate';

export class UserServices extends ModelCrudTemplate<
  User,
  {
    email: string;
    password: string;
    name: string;
  },
  GetAllUsersArgs
> {
  constructor() {
    super(modelGetter, getAllFilterQuery);
  }
}
