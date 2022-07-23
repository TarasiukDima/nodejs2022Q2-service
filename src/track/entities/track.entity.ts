import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ITrack } from '../../types/index';

@Entity('tracks')
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string | null;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;

  constructor(userInfo: Partial<Track>) {
    Object.assign(this, userInfo);
  }
}
