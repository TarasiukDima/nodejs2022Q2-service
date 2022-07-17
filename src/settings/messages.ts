export enum USER_MESSAGES {
  notFoundUser = "UserId doesn't exist",
  badBody = 'Body does not contain required fields',
  invalidUserId = 'UserId is invalid (not uuid)',
  wrongOldPassword = 'OldPassword is wrong',
}

export enum ARTIST_MESSAGES {
  notFound = "ArtistId doesn't exist",
  badBody = 'Body does not contain required fields',
}

export enum ALBUM_MESSAGES {
  notFound = "AlbumId doesn't exist",
  badBody = 'Body does not contain required fields',
}

export enum TRACK_MESSAGES {
  notFound = "TrackId doesn't exist",
  badBody = 'Body does not contain required fields',
}
