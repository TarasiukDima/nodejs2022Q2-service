import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { Favorite } from './entities/favorite.entity';
import { IFavoritesResponse } from '../types';

@Injectable()
export class FavoritesService {
  private static dataBase: Favorite = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  private filterArray = async (
    idForExclude: string,
    array: Array<string>,
  ): Promise<Array<string>> => {
    return [...array].filter((oneItem) => oneItem !== idForExclude);
  };

  private checkIncludeId = async (
    id: string,
    array: Array<string>,
  ): Promise<boolean> => {
    return array.includes(id);
  };

  private async gelItemsFromAnswer<T>(
    array: Array<PromiseSettledResult<T>>,
  ): Promise<Array<T>> {
    const arr = array.map((item) =>
      item.status === 'fulfilled' ? item.value : null,
    );

    return arr.filter((item) => item);
  }

  findAll = async (): Promise<IFavoritesResponse> => {
    const artists = await Promise.allSettled(
      FavoritesService.dataBase.artists.map((artistId) =>
        this.artistService.findOne(artistId),
      ),
    );
    const albums = await Promise.allSettled(
      FavoritesService.dataBase.albums.map((albumId) =>
        this.albumService.findOne(albumId),
      ),
    );
    const tracks = await Promise.allSettled(
      FavoritesService.dataBase.tracks.map((trackId) =>
        this.trackService.findOne(trackId),
      ),
    );

    return {
      artists: await this.gelItemsFromAnswer<Artist>(artists),
      albums: await this.gelItemsFromAnswer<Album>(albums),
      tracks: await this.gelItemsFromAnswer<Track>(tracks),
    };
  };

  createAlbum = async (id: string) => {
    const album = await this.albumService.findOne(id);

    if (!album) {
      return null;
    }

    const existAlbum = await this.checkIncludeId(
      id,
      FavoritesService.dataBase.albums,
    );

    if (!existAlbum) {
      FavoritesService.dataBase.albums.push(id);
    }

    return album;
  };

  removeAlbum = async (id: string) => {
    const existAlbum = await this.checkIncludeId(
      id,
      FavoritesService.dataBase.albums,
    );

    if (!existAlbum) {
      return null;
    }

    FavoritesService.dataBase.albums = await this.filterArray(
      id,
      FavoritesService.dataBase.albums,
    );

    return true;
  };

  createArtist = async (id: string) => {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      return null;
    }

    const existArtist = await this.checkIncludeId(
      id,
      FavoritesService.dataBase.artists,
    );

    if (!existArtist) {
      FavoritesService.dataBase.artists.push(id);
    }

    return artist;
  };

  removeArtist = async (id: string) => {
    const existArtist = await this.checkIncludeId(
      id,
      FavoritesService.dataBase.artists,
    );

    if (!existArtist) {
      return null;
    }

    FavoritesService.dataBase.artists = await this.filterArray(
      id,
      FavoritesService.dataBase.artists,
    );

    return true;
  };

  createTrack = async (id: string) => {
    const track = await this.trackService.findOne(id);

    if (!track) {
      return null;
    }

    const existTrack = await this.checkIncludeId(
      id,
      FavoritesService.dataBase.tracks,
    );

    if (!existTrack) {
      FavoritesService.dataBase.tracks.push(id);
    }

    return track;
  };

  removeTrack = async (id: string) => {
    const existTrack = await this.checkIncludeId(
      id,
      FavoritesService.dataBase.tracks,
    );

    if (!existTrack) {
      return null;
    }

    FavoritesService.dataBase.tracks = await this.filterArray(
      id,
      FavoritesService.dataBase.tracks,
    );

    return true;
  };
}
