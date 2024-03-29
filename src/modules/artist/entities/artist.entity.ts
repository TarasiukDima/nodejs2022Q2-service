import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IArtist } from '../../../types/index';

@Entity('artists')
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;

  constructor(artistInfo: Partial<Artist>) {
    Object.assign(this, artistInfo);
  }
}
