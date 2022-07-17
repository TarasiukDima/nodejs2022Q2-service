import { IAlbum } from '../../types';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(userInfo: Partial<Album>) {
    Object.assign(this, userInfo);
  }
}
