import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { MemoryDB } from '../memoryDB/memoryDB';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  private static memory: MemoryDB<Artist> = new MemoryDB<Artist>();

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  create = async (createArtistDto: CreateArtistDto): Promise<Artist> => {
    const artist = new Artist({
      id: v4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });

    return await ArtistService.memory.addItem(artist);
  };

  findAll = async (): Promise<Array<Artist>> => {
    return await ArtistService.memory.getAllItems();
  };

  findOne = async (id: string): Promise<Artist | null> => {
    return await ArtistService.memory.getOneItemById(id);
  };

  update = async (
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> => {
    const artist = await ArtistService.memory.getOneItemById(id);

    if (!artist) {
      return null;
    }

    const artistUpdated = new Artist({
      ...artist,
      ...updateArtistDto,
    });

    return await ArtistService.memory.updateItem(id, artistUpdated);
  };

  remove = async (id: string): Promise<boolean> => {
    await this.favoritesService.removeArtist(id);
    await this.trackService.removeArtistIdLink(id);
    await this.albumService.removeArtistIdLink(id);

    return await ArtistService.memory.removeItem(id);
  };
}
