import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { ID_ENTITY_OPTIONS } from 'src/settings/index';
import { getJoinColumnOptions } from 'src/utils/index';
import { ITrack } from '../../types/index';

@Entity('tracks')
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Album, (album) => album.id, ID_ENTITY_OPTIONS)
  @JoinColumn(getJoinColumnOptions('albumId'))
  albumId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.id, ID_ENTITY_OPTIONS)
  @JoinColumn(getJoinColumnOptions('artistId'))
  artistId: string | null;

  @Column()
  duration: number;

  constructor(userInfo: Partial<Track>) {
    Object.assign(this, userInfo);
  }
}
