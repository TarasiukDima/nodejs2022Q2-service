import { Exclude } from 'class-transformer';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';
import { FAVORITES_ENTITY_OPTIONS } from '../../../settings/index';
import { IFavorites } from '../../../types/index';

@Entity('favorites')
export class Favorite implements IFavorites {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: string;

  @ManyToMany(() => Album, FAVORITES_ENTITY_OPTIONS)
  @JoinTable()
  albums: Array<Album>;

  @ManyToMany(() => Artist, FAVORITES_ENTITY_OPTIONS)
  @JoinTable()
  artists: Array<Artist>;

  @ManyToMany(() => Track, FAVORITES_ENTITY_OPTIONS)
  @JoinTable()
  tracks: Array<Track>;
}
