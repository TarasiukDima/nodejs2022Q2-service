import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWT_SECRET_REFRESH_KEY } from '../../../settings/index';
import { UserService } from '../../user/user.service';
import { AUTH_MESSAGES } from '../../../settings/messages';
import { IJWTStrategyToken } from '../../../types/index';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_REFRESH_KEY,
    });
  }

  async validate({ id, login }: IJWTStrategyToken) {
    const userExist = await this.userService.findByLogin(login);

    if (!userExist || userExist.id !== id) {
      throw new UnauthorizedException(AUTH_MESSAGES.notFoundUserToken);
    }

    return { id, login };
  }
}
