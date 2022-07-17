import { IFavorites } from '../../types/index';

export class Favorite implements IFavorites {
  artists: Array<string>;
  albums: Array<string>;
  tracks: Array<string>;
}
