import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackService: Repository<Track>,
    private albumRepository: AlbumService,
    private artistService: ArtistService,
  ) {}

  private checkAndMakeCorrectIdAlbum = async (
    options: CreateTrackDto | UpdateTrackDto,
  ): Promise<void> => {
    const album = await this.albumRepository.findOne(options.albumId);

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

  create = async (createTrackDto: CreateTrackDto): Promise<Track> => {
    await this.checkAndMakeCorrectIds(createTrackDto);

    const track = await this.trackService.create(createTrackDto);

    return await this.trackService.save(track);
  };

  findAll = async (): Promise<Array<Track>> => {
    return await this.trackService.find();
  };

  findOne = async (id: string): Promise<Track> => {
    return await this.trackService.findOneBy({ id });
  };

  update = async (
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<Track> => {
    await this.checkAndMakeCorrectIds(updateTrackDto);

    const track = await this.trackService.findOneBy({ id });

    if (!track) {
      return null;
    }

    await this.trackService.update({ id }, updateTrackDto);

    return await this.trackService.findOneBy({ id });
  };

  remove = async (id: string): Promise<DeleteResult> => {
    const track = await this.trackService.findOneBy({ id });

    if (!track) {
      return null;
    }

    return await this.trackService.delete({ id });
  };
}
