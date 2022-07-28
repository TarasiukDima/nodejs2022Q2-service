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
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { VERSION_UUID } from '../settings/index';
import { ALBUM_MESSAGES } from '../settings/messages';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll() {
    return await this.albumService.findAll();
  }

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
