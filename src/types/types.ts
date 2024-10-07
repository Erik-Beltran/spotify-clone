import { colors } from './colors'

export interface Playlist {
  id: string
  albumId: number
  title: string
  color: string
  cover: string
  artists: string[]
}
export interface Song {
  album: string
  albumId: number
  artists: string[]
  duration: string
  id: string
  image: string
  title: string
}

export interface Music {
  song: Song
  songs: Song[]
  playlist: Playlist
}
