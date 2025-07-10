import { library } from '@/app/player-service'
import { Artist, TrackWithPlaylist } from '@/helpers/types'
import { AudioProTrack } from '@/types/audioProTypes'
import { create } from 'zustand'

interface LibraryState {
	tracks: TrackWithPlaylist[]
	addToPlaylist: (track: AudioProTrack, playlistName: string) => void
}

export const useLibraryStore = create<LibraryState>()((set) => ({
	tracks: library,
	addToPlaylist: () => {},
}))

export const useTracks = () => useLibraryStore((state) => library)

export const useArtists = () =>
	useLibraryStore((state) => {
		return library.reduce((acc, track) => {
			const existingArtist = acc.find((artist) => artist.name === track.artist)

			if (existingArtist) {
				existingArtist.tracks.push(track)
			} else {
				acc.push({
					name: track.artist ?? 'Unknown',
					tracks: [track],
				})
			}

			return acc
		}, [] as Artist[])
	})

export const usePlaylist = (playlist: string) =>
	useLibraryStore((state) => state.tracks.filter((track) => track.playlist?.includes(playlist)))
