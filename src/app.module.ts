import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/quards/jwt-auth.guard';
import { LoggingMiddleware } from './modules/logger/logging.middleware';
import { AllExceptionsFilter } from './modules/logger/exception.filter';
import { typeormConfig } from './ormconfig';

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
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
