import { IsNotEmpty, IsString } from 'class-validator';
import { ILoginUserData } from '../../../types/index';

export class LoginUserDto implements ILoginUserData {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
