/* album start */
export interface IAlbumCommon {
  id: string; // uuid v4
  name: string;
  year: number;
}

export interface IAlbum extends IAlbumCommon {
  artistId: string | null;
}

export interface IAlbumResponse extends IAlbumCommon {
  artistId: IArtist | null;
}
/* album end */

/* track start */
export interface ITrackCommon {
  id: string; // uuid v4
  name: string;
  duration: number; // integer number
}

export interface ITrack extends ITrackCommon {
  artistId: string | null;
  albumId: string | null;
}

export interface ITrackResponse extends ITrackCommon {
  artistId: IArtist | null;
  albumId: IAlbumResponse | null;
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
