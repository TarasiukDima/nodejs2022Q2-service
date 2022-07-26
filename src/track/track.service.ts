import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackService: Repository<Track>,
  ) {}

  create = async (createTrackDto: CreateTrackDto): Promise<Track> => {
    const track = await this.trackService.create(createTrackDto);

    return await this.trackService.save(track);
  };

  findAll = async (): Promise<Array<Track>> => {
    return await this.trackService.find();
  };

  findOne = async (id: string): Promise<Track> => {
    return await this.trackService.findOneBy({ id });
  };

  update = async (
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> => {
    const track = await this.trackService.findOneBy({ id });

    if (!track) {
      return null;
    }

    await this.trackService.update({ id }, updateTrackDto);

    return await this.trackService.findOneBy({ id });
  };

  remove = async (id: string): Promise<DeleteResult> => {
    const track = await this.trackService.findOneBy({ id });

    if (!track) {
      return null;
    }

    return await this.trackService.delete({ id });
  };
}
