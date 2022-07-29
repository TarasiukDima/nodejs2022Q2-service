import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { MemoryDB } from '../memoryDB/memoryDB';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class TrackService {
  private static memory: MemoryDB<Track> = new MemoryDB<Track>();

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  private checkAndMakeCorrectIdAlbum = async (
    options: CreateTrackDto | UpdateTrackDto,
  ): Promise<void> => {
    const album = await this.albumService.findOne(options.albumId);

    if (!album) {
      options.albumId = null;
    }
  };

  private checkAndMakeCorrectIdArtist = async (
    options: CreateTrackDto | UpdateTrackDto,
  ): Promise<void> => {
    const artist = await this.artistService.findOne(options.artistId);

    if (!artist) {
      options.artistId = null;
    }
  };

  private checkAndMakeCorrectIds = async (
    options: CreateTrackDto | UpdateTrackDto,
  ): Promise<void> => {
    if (options.albumId) {
      await this.checkAndMakeCorrectIdAlbum(options);
    }
    if (options.artistId) {
      await this.checkAndMakeCorrectIdArtist(options);
    }
  };

  create = async (createTrackDto: CreateTrackDto) => {
    await this.checkAndMakeCorrectIds(createTrackDto);

    const track = new Track({
      id: v4(),
      ...createTrackDto,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
    });

    return await TrackService.memory.addItem(track);
  };

  findAll = async () => {
    return await TrackService.memory.getAllItems();
  };

  findOne = async (id: string) => {
    return await TrackService.memory.getOneItemById(id);
  };

  update = async (id: string, updateTrackDto: UpdateTrackDto) => {
    await this.checkAndMakeCorrectIds(updateTrackDto);

    const track = await TrackService.memory.getOneItemById(id);

    if (!track) {
      return null;
    }

    const trackUpdated = new Track({
      ...track,
      ...updateTrackDto,
    });

    return await TrackService.memory.updateItem(id, trackUpdated);
  };

  remove = async (id: string) => {
    await this.favoritesService.removeTrack(id);

    return await TrackService.memory.removeItem(id);
  };

  removeArtistIdLink = async (id: string): Promise<void> => {
    await TrackService.memory.removeItemIdLink(id, 'artistId');
  };

  removeAlbumIdLink = async (id: string): Promise<void> => {
    await TrackService.memory.removeItemIdLink(id, 'albumId');
  };
}
