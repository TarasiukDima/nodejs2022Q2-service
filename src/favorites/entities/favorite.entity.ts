import { Entity } from 'typeorm';
import { IFavorites } from '../../types/index';

@Entity('favorites')
export class Favorite implements IFavorites {
  artists: Array<string>;
  albums: Array<string>;
  tracks: Array<string>;
}
