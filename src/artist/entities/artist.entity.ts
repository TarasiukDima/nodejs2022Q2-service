import { IArtist } from '../../types/index';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(userInfo: Partial<Artist>) {
    Object.assign(this, userInfo);
  }
}
