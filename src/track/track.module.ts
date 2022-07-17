import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, AlbumService, ArtistService, FavoritesService],
})
export class TrackModule {}
