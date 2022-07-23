import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IAlbum } from '../../types/index';

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

  constructor(userInfo: Partial<Album>) {
    Object.assign(this, userInfo);
  }
}
