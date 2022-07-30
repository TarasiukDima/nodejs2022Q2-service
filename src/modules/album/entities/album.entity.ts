import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { ID_ENTITY_OPTIONS } from '../../../settings/index';
import { getJoinColumnOptions } from '../../../utils/index';
import { IAlbum } from '../../../types/index';

@Entity('albums')
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, (artist) => artist.id, ID_ENTITY_OPTIONS)
  @JoinColumn(getJoinColumnOptions('artistId'))
  artist: string | null;

  constructor(albumInfo: Partial<Album>) {
    Object.assign(this, albumInfo);
  }
}
