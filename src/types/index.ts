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
  albums: Array<IAlbum>;
  artists: Array<IArtist>;
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
