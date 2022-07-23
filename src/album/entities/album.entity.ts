import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { ID_ENTITY_OPTIONS } from 'src/settings/index';
import { getJoinColumnOptions } from 'src/utils/index';
import { IAlbum } from '../../types/index';

@Entity('albums')
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist.id, ID_ENTITY_OPTIONS)
  @JoinColumn(getJoinColumnOptions('artistId'))
  artistId: string | null;

  constructor(userInfo: Partial<Album>) {
    Object.assign(this, userInfo);
  }
}
