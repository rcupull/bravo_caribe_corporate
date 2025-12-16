import { BaseIdentity, Image } from "./general";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User extends BaseIdentity {
  name: string;
  email: string;
  role: UserRole;
  validated: boolean;
  profileImage?: Image;
  specialAccess?: Array<string>;
}

export type UserData = User | null;

export interface AuthData {
  user: User;
}

export interface AuthDataDto extends AuthData {
  accessToken: string;
  refreshToken: string;
  steat: number;
}
