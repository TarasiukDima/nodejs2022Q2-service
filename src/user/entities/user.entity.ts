import { Exclude } from 'class-transformer';
import { IUser } from 'src/types';

export class User implements IUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(userInfo: Partial<User>) {
    Object.assign(this, userInfo);
  }
}
