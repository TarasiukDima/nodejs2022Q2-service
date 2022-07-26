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

  @Column({ nullable: true })
  albumId: string | null;

  @ManyToOne(() => Album, (album) => album.id, ID_ENTITY_OPTIONS)
  @JoinColumn(getJoinColumnOptions('albumId'))
  album: string | null;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.id, ID_ENTITY_OPTIONS)
  @JoinColumn(getJoinColumnOptions('artistId'))
  artist: string | null;

  @Column()
  duration: number;

  constructor(trackInfo: Partial<Track>) {
    Object.assign(this, trackInfo);
  }
}
