import { IFavorites } from 'src/types';

export class Favorite implements IFavorites {
  artists: Array<string>;
  albums: Array<string>;
  tracks: Array<string>;
}
