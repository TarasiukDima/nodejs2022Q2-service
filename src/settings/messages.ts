export enum USER_MESSAGES {
  notFoundUser = "UserId doesn't exist",
  invalidUserId = 'UserId is invalid (not uuid)',
  wrongOldPassword = 'OldPassword is wrong',
}

export enum ARTIST_MESSAGES {
  notFound = "ArtistId doesn't exist",
}

export enum ALBUM_MESSAGES {
  notFound = "AlbumId doesn't exist",
}

export enum TRACK_MESSAGES {
  notFound = "TrackId doesn't exist",
}

export enum FAVORITES_MESSAGES {
  notFoundAlbum = 'Album is not favorite',
  notFoundArtist = 'Artist is not favorite',
  notFoundTrack = 'Track is not favorite',
  notExistAlbum = 'Album is not exist',
  notExistArtist = 'Artist is not exist',
  notExistTrack = 'Track is not exist',
}
