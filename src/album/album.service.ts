import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { MemoryDB } from '../memoryDB/memoryDB';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private memory: MemoryDB<Album> = new MemoryDB<Album>();

  create = async (createAlbumDto: CreateAlbumDto) => {
    const album = new Album({
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    });

    return await this.memory.addItem(album);
  };

  findAll = async () => {
    return await this.memory.getAllItems();
  };

  findOne = async (id: string) => {
    return await this.memory.getOneItemById(id);
  };

  update = async (id: string, updateAlbumDto: UpdateAlbumDto) => {
    const album = await this.memory.getOneItemById(id);

    if (!album) {
      return null;
    }

    const artistUpdated = new Album({
      ...album,
      ...updateAlbumDto,
    });

    return await this.memory.updateItem(id, artistUpdated);
  };

  remove = async (id: string) => {
    return await this.memory.removeItem(id);
  };
}
