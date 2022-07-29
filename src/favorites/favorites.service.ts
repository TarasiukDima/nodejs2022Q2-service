import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { Favorite } from './entities/favorite.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
    private albumService: AlbumService,
    private artistService: ArtistService,
    private trackService: TrackService,
  ) {}

  private filterArray = async (
    idForExclude: string,
    array: Array<Album | Artist | Track>,
  ): Promise<Array<Album | Artist | Track>> => {
    return [...array].filter((oneItem) => oneItem.id !== idForExclude);
  };

  private checkIncludeId = async (
    id: string,
    array: Array<Album | Artist | Track>,
  ): Promise<boolean> => {
    return array.reduce((acc, oneItem) => {
      if (oneItem.id === id) {
        return true;
      }
      return acc;
    }, false);
  };

  findAll = async (): Promise<Favorite> => {
    const favorites = await this.favoriteRepository.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    return favorites.length === 0
      ? await this.favoriteRepository.save({
          albums: [],
          artists: [],
          tracks: [],
        })
      : favorites[0];
  };

  createAlbum = async (id: string): Promise<Album | null> => {
    const album = await this.albumService.findOne(id);

    if (!album) {
      return null;
    }

    const favorites = await this.findAll();
    const existAlbum = await this.checkIncludeId(id, favorites.albums);

    if (!existAlbum) {
      favorites.albums.push(album);
      await this.favoriteRepository.save(favorites);
    }

    return album;
  };

  removeAlbum = async (id: string): Promise<boolean | null> => {
    const favorites = await this.findAll();
    const existAlbum = await this.checkIncludeId(id, favorites.albums);

    if (!existAlbum) {
      return null;
    }

    favorites.albums = (await this.filterArray(
      id,
      favorites.albums,
    )) as Array<Album>;
    await this.favoriteRepository.save(favorites);

    return true;
  };

  createArtist = async (id: string): Promise<Artist | null> => {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      return null;
    }

    const favorites = await this.findAll();
    const existArtist = await this.checkIncludeId(id, favorites.artists);

    if (!existArtist) {
      favorites.artists.push(artist);
      await this.favoriteRepository.save(favorites);
    }

    return artist;
  };

  removeArtist = async (id: string): Promise<boolean | null> => {
    const favorites = await this.findAll();
    const existArtist = await this.checkIncludeId(id, favorites.artists);

    if (!existArtist) {
      return null;
    }

    favorites.artists = (await this.filterArray(
      id,
      favorites.artists,
    )) as Array<Artist>;
    await this.favoriteRepository.save(favorites);

    return true;
  };

  createTrack = async (id: string): Promise<Track | null> => {
    const track = await this.trackService.findOne(id);

    if (!track) {
      return null;
    }

    const favorites = await this.findAll();
    const existTrack = await this.checkIncludeId(id, favorites.tracks);

    if (!existTrack) {
      favorites.tracks.push(track);
      await this.favoriteRepository.save(favorites);
    }

    return track;
  };

  removeTrack = async (id: string): Promise<boolean | null> => {
    const favorites = await this.findAll();
    const existTrack = await this.checkIncludeId(id, favorites.tracks);

    if (!existTrack) {
      return null;
    }

    favorites.tracks = (await this.filterArray(
      id,
      favorites.tracks,
    )) as Array<Track>;
    await this.favoriteRepository.save(favorites);

    return true;
  };
}
