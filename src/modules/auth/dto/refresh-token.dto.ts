import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshUserDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
