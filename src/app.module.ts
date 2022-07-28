import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { typeormConfig } from './ormconfig';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/quards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
