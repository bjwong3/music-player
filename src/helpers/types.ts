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

export type ID3 = {
	type: string
	version: string
	major: number
	revision: number
	tags: ID3Tags
	size: number
	flags: Flags
}

export type ID3Tags = {
	artist: string
	album: string
	track: string
	TPE1: TPE1
	TALB: TALB
	TRCK: TRCK
}

export type TPE1 = {
	id: string
	size: number
	description: string
	data: string
}

export type TALB = {
	id: string
	size: number
	description: string
	data: string
}

export type TRCK = {
	id: string
	size: number
	description: string
	data: string
}

export type Flags = {
	unsynchronisation: boolean
	extended_header: boolean
	experimental_indicator: boolean
	footer_present: boolean
}
