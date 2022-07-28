import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  ParseUUIDPipe,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/quards/jwt-auth.guard';
import { USER_MESSAGES } from '../settings/messages';
import { VERSION_UUID } from '../settings/index';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(StatusCodes.OK)
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException(USER_MESSAGES.notFoundUser);
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(StatusCodes.OK)
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
    @Body() { oldPassword, newPassword }: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, {
      oldPassword,
      newPassword,
    });

    if (updatedUser === USER_MESSAGES.wrongOldPassword) {
      throw new ForbiddenException(USER_MESSAGES.wrongOldPassword);
    }

    if (!updatedUser) {
      throw new NotFoundException(USER_MESSAGES.notFoundUser);
    }

    return updatedUser;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const user = await this.userService.remove(id);

    if (!user) {
      throw new NotFoundException(USER_MESSAGES.notFoundUser);
    }

    return user;
  }
}
