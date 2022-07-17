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
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';
import { VERSION_UUID } from '../settings/index';
import { TRACK_MESSAGES } from 'src/settings/messages';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll() {
    return this.trackService.findAll();
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
    const album = await this.trackService.findOne(id);

    if (!album) {
      throw new NotFoundException(TRACK_MESSAGES.notFound);
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(id, updateTrackDto);

    if (!updatedTrack) {
      throw new NotFoundException(TRACK_MESSAGES.notFound);
    }
    return updatedTrack;
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
    const track = await this.trackService.remove(id);

    if (!track) {
      throw new NotFoundException(TRACK_MESSAGES.notFound);
    }

    return track;
  }
}
