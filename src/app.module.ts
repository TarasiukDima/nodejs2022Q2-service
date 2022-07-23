import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Favorite } from './favorites/entities/favorite.entity';
import { Track } from './track/entities/track.entity';
import {
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
} from './settings';

console.log(TYPEORM_HOST);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: TYPEORM_HOST,
      port: TYPEORM_PORT,
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      // entities: [Album, Artist, Favorite, Track, User],
      entities: [Album, Artist, Track, User],

      // TODO: REMOVE IN THE END!!!!!!!!!!!!!!!!!!!
      synchronize: true,
      //

      autoLoadEntities: true,
      logging: true,
      retryAttempts: 10,
    }),
    // AlbumModule,
    // ArtistModule,
    // TrackModule,
    // FavoritesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
