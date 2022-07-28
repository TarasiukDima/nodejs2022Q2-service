import {
  Controller,
  Post,
  Body,
  HttpCode,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshUserDto } from './dto/refresh-token.dto';
import { AuthService } from './auth.service';
import { AUTH_MESSAGES } from '../settings/messages';
import { JwtAuthGuard } from './quards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    await this.authService.create(createUserDto);

    return { message: AUTH_MESSAGES.createUser };
  }

  @Post('login')
  @HttpCode(StatusCodes.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    const jwt = await this.authService.login(loginUserDto);

    if (!jwt) {
      throw new ForbiddenException(AUTH_MESSAGES.notFoundUser);
    }

    return jwt;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @HttpCode(StatusCodes.OK)
  async refresh(@Body() refreshUserDto: RefreshUserDto) {
    const newJwt = await this.authService.refresh(refreshUserDto);

    //Server should answer with status code 200 and tokens in body if dto is valid
    // Server should answer with status code 401 and corresponding message if dto is invalid (no refreshToken in body)
    // Server should answer with status code 403 and corresponding message if authentication failed(Refresh token is invalid or expired)

    return newJwt;
  }
}
