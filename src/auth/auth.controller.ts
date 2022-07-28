import {
  Controller,
  Post,
  Body,
  HttpCode,
  ForbiddenException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-token.dto';
import { AuthService } from './auth.service';
import { AUTH_MESSAGES } from '../settings/messages';
import { Public } from '../decorators/index';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.authService.create(createUserDto);

    return { message: AUTH_MESSAGES.createUser };
  }

  @Public()
  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const jwt = await this.authService.login(loginUserDto);

    if (!jwt) {
      throw new ForbiddenException(AUTH_MESSAGES.notFoundUser);
    }

    return jwt;
  }

  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Body() refreshUserDto: RefreshUserDto) {
    const newJwt = await this.authService.refresh(refreshUserDto);

    if (!newJwt) {
      throw new ForbiddenException(AUTH_MESSAGES.invalidRefreshToken);
    }

    return newJwt;
  }
}
