import { User, UserDto } from '../../types/user';
import { AuthSessionServices } from '../auth-session/services';
import { deepJsonCopy } from '../../utils/general';

export class UserDtosServices {
  constructor(private readonly authSessionServices: AuthSessionServices) {}

  getUsersDto = async (users: Array<User>): Promise<Array<UserDto>> => {
    const getDto = async (user: User): Promise<UserDto> => {
      const out: UserDto = {
        ...deepJsonCopy(user)
      };

      return out;
    };

    const promises = users.map(getDto);

    const out = await Promise.all(promises);

    return out;
  };
}
