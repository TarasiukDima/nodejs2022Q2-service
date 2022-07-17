import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { MemoryDB } from '../memoryDB/memoryDB';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  private static memory: MemoryDB<Album> = new MemoryDB<Album>();

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  create = async (createAlbumDto: CreateAlbumDto) => {
    const album = new Album({
      id: v4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    });

    return await AlbumService.memory.addItem(album);
  };

  findAll = async () => {
    return await AlbumService.memory.getAllItems();
  };

  findOne = async (id: string) => {
    return await AlbumService.memory.getOneItemById(id);
  };

  update = async (id: string, updateAlbumDto: UpdateAlbumDto) => {
    const album = await AlbumService.memory.getOneItemById(id);

    if (!album) {
      return null;
    }

    const artistUpdated = new Album({
      ...album,
      ...updateAlbumDto,
    });

    return await AlbumService.memory.updateItem(id, artistUpdated);
  };

  remove = async (id: string) => {
    await this.favoritesService.removeAlbum(id);
    await this.trackService.removeAlbumIdLink(id);

    return await AlbumService.memory.removeItem(id);
  };

  removeArtistIdLink = async (id: string): Promise<void> => {
    await AlbumService.memory.removeItemIdLink(id, 'artistId');
  };
}
