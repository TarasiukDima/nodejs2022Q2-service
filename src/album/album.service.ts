import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumService: Repository<Album>,
    private artistService: ArtistService,
  ) {}

  private checkAndMakeCorrectIdArtist = async (
    options: CreateAlbumDto | UpdateAlbumDto,
  ): Promise<void> => {
    const artist = await this.artistService.findOne(options.artistId);

    if (!artist) {
      options.artistId = null;
    }
  };

  create = async (createAlbumDto: CreateAlbumDto): Promise<Album> => {
    if (createAlbumDto.artistId) {
      await this.checkAndMakeCorrectIdArtist(createAlbumDto);
    }

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
    if (updateAlbumDto.artistId) {
      await this.checkAndMakeCorrectIdArtist(updateAlbumDto);
    }

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
