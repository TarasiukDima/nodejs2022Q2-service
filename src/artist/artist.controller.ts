import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { JwtAuthGuard } from '../auth/quards/jwt-auth.guard';
import { ARTIST_MESSAGES } from '../settings/messages';
import { VERSION_UUID } from '../settings/index';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll() {
    return await this.artistService.findAll();
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
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException(ARTIST_MESSAGES.notFound);
    }

    return artist;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: StatusCodes.BAD_REQUEST as number,
        version: VERSION_UUID,
      }),
    )
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const updatedArtist = await this.artistService.update(id, updateArtistDto);

    if (!updatedArtist) {
      throw new NotFoundException(ARTIST_MESSAGES.notFound);
    }

    return updatedArtist;
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
    const artist = await this.artistService.remove(id);

    if (!artist) {
      throw new NotFoundException(ARTIST_MESSAGES.notFound);
    }

    return artist;
  }
}
