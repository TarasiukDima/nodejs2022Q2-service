import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-token.dto';
import { ICreateJwTToken, IJWTData, ITokenAnswer } from '../types/index';
import { TOKEN_REFRESH_EXPIRE_TIME } from '../settings/index';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  private generateToken = async (
    data: ICreateJwTToken,
    options?: JwtSignOptions,
  ): Promise<string> => {
    const token = this.jwtService.sign(data, options);

    return token;
  };

  private getTokens = async (data: ICreateJwTToken): Promise<ITokenAnswer> => {
    const user = { id: data.id, login: data.login };
    return {
      token: await this.generateToken(user),
      refreshToken: await this.generateToken(
        { ...user, isRefresh: true },
        { expiresIn: TOKEN_REFRESH_EXPIRE_TIME },
      ),
    };
  };

  private decodeTokenData = async (
    token: string,
  ): Promise<IJWTData | boolean> => {
    try {
      const jwtData: IJWTData = await this.jwtService.verifyAsync(token, {
        maxAge: TOKEN_REFRESH_EXPIRE_TIME,
      });

      return jwtData;
    } catch (e) {
      return false;
    }
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

    return await this.getTokens({ id: user.id, login: user.login });
  };

  refresh = async (
    refreshUserDto: RefreshUserDto,
  ): Promise<ITokenAnswer | null> => {
    const tokenObj = await this.decodeTokenData(refreshUserDto.refreshToken);

    if (!tokenObj) {
      return null;
    }

    const { id, login, isRefresh = false } = tokenObj as IJWTData;
    const user = await this.usersService.findByLogin(login);

    if (!user || user.id !== id || !isRefresh) {
      return null;
    }

    return await this.getTokens({ id: user.id, login: user.login });
  };
}
