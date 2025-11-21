import { FilterQuery } from 'mongoose';
import { BaseIdentity, Image } from './general';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export interface GetAllUsersArgs extends FilterQuery<User> {
  search?: string;
}

export interface passwordHistory {
  password: string;
  createdAt: Date;
}

export enum Access {
  FULL = 'full'
}

export interface User extends BaseIdentity {
  name: string;
  email: string;
  password: string;
  passwordHistory: Array<passwordHistory>;
  role: UserRole;
  validated: boolean;
  profileImage?: Image;
  specialAccess?: Array<string>;
}

export interface UserDto extends User {}
