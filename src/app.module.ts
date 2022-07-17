import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
