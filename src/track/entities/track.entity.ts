import { ITrack } from '../../types/index';

export class Track implements ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(userInfo: Partial<Track>) {
    Object.assign(this, userInfo);
  }
}
