import { AudioProTrack } from '@/types/audioProTypes'

export type TrackWithPlaylist = AudioProTrack & { playlist?: string[]; img?: string }

export type Playlist = {
	name: string
	tracks: AudioProTrack[]
	artworkPreview: string
}

export type Artist = {
	name: string
	tracks: AudioProTrack[]
}
