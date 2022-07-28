import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-token.dto';
import { ITokenAnswer } from 'src/types';
import { TOKEN_REFRESH_EXPIRE_TIME } from 'src/settings';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateToken = async (
    id: string,
    login: string,
    options?: JwtSignOptions,
  ): Promise<string> => {
    const token = this.jwtService.sign({ id, login }, options);

    return token;
  };

  private validateUser = async (
    login: string,
    password: string,
  ): Promise<User | null> => {
    const user = await this.usersService.findByLogin(login);

    if (!user) {
      return null;
    }

    const samePassword = await compare(password, user.password);

    return samePassword ? user : null;
  };

  create = async (createUserDto: CreateUserDto): Promise<User | null> => {
    return await this.usersService.create(createUserDto);
  };

  login = async (loginUserDto: LoginUserDto): Promise<ITokenAnswer | null> => {
    const user = await this.validateUser(
      loginUserDto.login,
      loginUserDto.password,
    );

    if (!user) {
      return null;
    }

    return {
      token: await this.generateToken(user.id, user.login),
      refreshToken: await this.generateToken(user.id, user.login, {
        expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  };

  refresh = async (refreshUserDto: RefreshUserDto) => {
    return 'refresh';
  };
}
