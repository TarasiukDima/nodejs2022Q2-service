import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { MemoryDB } from '../memoryDB/memoryDB';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private memory: MemoryDB<Track> = new MemoryDB<Track>();

  create = async (createTrackDto: CreateTrackDto) => {
    const track = new Track({
      id: v4(),
      ...createTrackDto,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
    });

    return await this.memory.addItem(track);
  };

  findAll = async () => {
    return await this.memory.getAllItems();
  };

  findOne = async (id: string) => {
    return await this.memory.getOneItemById(id);
  };

  update = async (id: string, updateTrackDto: UpdateTrackDto) => {
    const track = await this.memory.getOneItemById(id);

    if (!track) {
      return null;
    }

    const trackUpdated = new Track({
      ...track,
      ...updateTrackDto,
    });

    return await this.memory.updateItem(id, trackUpdated);
  };

  remove = async (id: string) => {
    return await this.memory.removeItem(id);
  };
}
