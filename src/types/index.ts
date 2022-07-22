/* album start */
export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null;
}
/* album end */

/* track start */
export interface ITrack {
  id: string; // uuid v4
  name: string;
  duration: number; // integer number
  artistId: string | null;
  albumId: string | null;
}
/* track end */

/* artist start */
export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
/* artist end */

/* favorites start */
export interface IFavorites {
  artists: Array<string>; // ids
  albums: Array<string>; // ids
  tracks: Array<string>; // ids
}
export interface IFavoritesResponse {
  artists: Array<IArtist>;
  albums: Array<IAlbum>;
  tracks: Array<ITrack>;
}
/* favorites end */

/* user start */
export interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
/* user end */
