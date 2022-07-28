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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { StatusCodes } from 'http-status-codes';
import { JwtAuthGuard } from '../auth/quards/jwt-auth.guard';
import { VERSION_UUID } from '../settings/index';
import { TRACK_MESSAGES } from '../settings/messages';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(StatusCodes.OK)
  async findAll() {
    return this.trackService.findAll();
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
    const album = await this.trackService.findOne(id);

    if (!album) {
      throw new NotFoundException(TRACK_MESSAGES.notFound);
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
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(id, updateTrackDto);

    if (!updatedTrack) {
      throw new NotFoundException(TRACK_MESSAGES.notFound);
    }

    return updatedTrack;
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
    const track = await this.trackService.remove(id);

    if (!track) {
      throw new NotFoundException(TRACK_MESSAGES.notFound);
    }

    return track;
  }
}
