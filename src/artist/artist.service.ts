import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { MemoryDB } from '../memoryDB/memoryDB';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private memory: MemoryDB<Artist> = new MemoryDB<Artist>();

  create = async (createArtistDto: CreateArtistDto) => {
    const artist = new Artist({
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });

    return await this.memory.addItem(artist);
  };

  findAll = async () => {
    return await this.memory.getAllItems();
  };

  findOne = async (id: string) => {
    return await this.memory.getOneItemById(id);
  };

  update = async (id: string, updateArtistDto: UpdateArtistDto) => {
    const artist = await this.memory.getOneItemById(id);

    if (!artist) {
      return null;
    }

    const artistUpdated = new Artist({
      ...artist,
      ...updateArtistDto,
    });

    return await this.memory.updateItem(id, artistUpdated);
  };

  remove = async (id: string) => {
    return await this.memory.removeItem(id);
  };
}
