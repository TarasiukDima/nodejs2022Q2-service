import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumService: Repository<Album>,
  ) {}

  create = async (createAlbumDto: CreateAlbumDto): Promise<Album> => {
    const album = await this.albumService.create(createAlbumDto);

    return await this.albumService.save(album);
  };

  findAll = async (): Promise<Array<Album>> => {
    return await this.albumService.find();
  };

  findOne = async (id: string): Promise<Album | null> => {
    return await this.albumService.findOneBy({ id });
  };

  update = async (
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album | null> => {
    const album = await this.albumService.findOneBy({ id });

    if (!album) {
      return null;
    }

    await this.albumService.update({ id }, updateAlbumDto);

    return await this.albumService.findOneBy({ id });
  };

  remove = async (id: string): Promise<DeleteResult> => {
    const album = await this.albumService.findOneBy({ id });

    if (!album) {
      return null;
    }

    return await this.albumService.delete({ id });
  };
}
