import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from '../auth/quards/jwt-auth.guard';
import { VERSION_UUID } from '../settings/index';
import { ALBUM_MESSAGES } from '../settings/messages';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll() {
    return await this.albumService.findAll();
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
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException(ALBUM_MESSAGES.notFound);
    }

    return album;
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
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const updatedAlbum = await this.albumService.update(id, updateAlbumDto);

    if (!updatedAlbum) {
      throw new NotFoundException(ALBUM_MESSAGES.notFound);
    }

    return updatedAlbum;
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
    const album = await this.albumService.remove(id);

    if (!album) {
      throw new NotFoundException(ALBUM_MESSAGES.notFound);
    }

    return album;
  }
}
