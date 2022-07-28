import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../auth/quards/jwt-auth.guard';
import { FAVORITES_MESSAGES } from '../settings/messages';
import { VERSION_UUID } from '../settings/index';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('album/:id')
  @HttpCode(StatusCodes.CREATED)
  async createAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const album = await this.favoritesService.createAlbum(id);

    if (!album) {
      throw new UnprocessableEntityException(FAVORITES_MESSAGES.notExistAlbum);
    }
    return album;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const album = await this.favoritesService.removeAlbum(id);

    if (!album) {
      throw new NotFoundException(FAVORITES_MESSAGES.notFoundAlbum);
    }

    return album;
  }

  @UseGuards(JwtAuthGuard)
  @Post('artist/:id')
  @HttpCode(StatusCodes.CREATED)
  async createArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const artist = await this.favoritesService.createArtist(id);

    if (!artist) {
      throw new UnprocessableEntityException(FAVORITES_MESSAGES.notExistArtist);
    }
    return artist;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const artist = await this.favoritesService.removeArtist(id);

    if (!artist) {
      throw new NotFoundException(FAVORITES_MESSAGES.notFoundArtist);
    }

    return artist;
  }

  @UseGuards(JwtAuthGuard)
  @Post('track/:id')
  @HttpCode(StatusCodes.CREATED)
  async createTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const track = await this.favoritesService.createTrack(id);

    if (!track) {
      throw new UnprocessableEntityException(FAVORITES_MESSAGES.notExistTrack);
    }
    return track;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
  ) {
    const track = await this.favoritesService.removeTrack(id);

    if (!track) {
      throw new NotFoundException(FAVORITES_MESSAGES.notFoundTrack);
    }

    return track;
  }
}
