import { Access, User, UserRole } from '../types/user';

export const userHasSomeAccess = (user: User | undefined, ...access: Array<Access>): boolean => {
  return access.map((val) => user?.specialAccess?.includes(val)).some(Boolean);
};

export const userIsAdmin = (user: User | undefined): boolean => {
  return user?.role === UserRole.ADMIN;
};
