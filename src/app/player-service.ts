import { unknownTrackImageUri } from '@/constants/images'
import { TrackWithPlaylist } from '@/helpers/types'
import { AudioProTrack } from '@/types/audioProTypes'
import jsmediatags from 'jsmediatags'
import { PermissionsAndroid } from 'react-native'
import { AudioProContentType, AudioProEvent, AudioProEventType } from 'react-native-audio-pro'
import { readDir } from 'react-native-fs'
import { MMKVLoader } from 'react-native-mmkv-storage'
import { AudioPro } from '../helpers/audioPro'
import { playlist } from './playlist'

// Track the current library position
let currentIndex = 0

export const MMKV = new MMKVLoader().initialize()

export let library: TrackWithPlaylist[] = MMKV.getArray('library') ?? playlist
export let queue: AudioProTrack[] = []

export function setupAudioPro(): void {
	// Configure audio settings
	AudioPro.configure({
		contentType: AudioProContentType.MUSIC,
		debug: true,
		debugIncludesProgress: false,
		progressIntervalMs: 1000,
		showNextPrevControls: false,
	})

	// Set up event listeners that persist for the app's lifetime
	AudioPro.addEventListener((event: AudioProEvent) => {
		switch (event.type) {
			case AudioProEventType.TRACK_ENDED:
				// Auto-play next track when current track ends
				playNextTrack()
				break

			case AudioProEventType.REMOTE_NEXT:
				// Handle next button press from lock screen/notification
				playNextTrack()
				break

			case AudioProEventType.REMOTE_PREV:
				// Handle previous button press from lock screen/notification
				playPreviousTrack(0)
				break

			case AudioProEventType.PLAYBACK_ERROR:
				console.warn('Playback error:', event.payload?.error)
				break
		}
	})
}

export function playNextTrack(): void {
	if (queue.length === 0) return

	currentIndex = (currentIndex + 1) % queue.length
	const nextTrack = queue[currentIndex]

	AudioPro.play(nextTrack, { autoPlay: true })
}

export function playPreviousTrack(position: number): void {
	if (position > 5000) {
		// If we're more than 5 seconds into the track, seek to beginning
		AudioPro.seekTo(0)
	} else {
		if (queue.length === 0) return

		currentIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1
		const prevTrack = queue[currentIndex]

		AudioPro.play(prevTrack, { autoPlay: true })
	}
}

export function getCurrentTrackIndex(): number {
	return currentIndex
}

export function setCurrentTrackIndex(index: number): void {
	if (index >= 0 && index < queue.length) {
		currentIndex = index
	}
}

export function getProgressInterval(): number {
	return AudioPro.getProgressInterval()!
}

export function setProgressInterval(ms: number): void {
	AudioPro.setProgressInterval(ms)
}

export function clearQueue(): void {
	queue = []
}

export function addNextToQueue(track: AudioProTrack): void {
	queue.splice(1, 0, track)
}

export function addToQueue(tracks: AudioProTrack[]): void {
	queue.push(...tracks)
}
export function setQueue(tracks: AudioProTrack[]): void {
	queue = tracks
}

const requestExternalStoragePermission = async () => {
	const readPermission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
	const hasPermission = await PermissionsAndroid.check(readPermission)
	if (hasPermission) {
		console.log('Permission Granted')
		return true
	} else {
		try {
			const status = await PermissionsAndroid.request(readPermission)
			if (status === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('Permission Granted')
				return true
			} else {
				console.log('Permission Denied')
				return false
			}
		} catch (error) {
			console.error('Permission Request Error: ', error)
			return false
		}
	}
}

export const getAudioFiles = async (path: string) => {
	const storeLibrary: TrackWithPlaylist[] = MMKV.getArray('library') ?? []
	console.log('lib: ' + storeLibrary)
	if (await requestExternalStoragePermission()) {
		try {
			const result = await readDir(path)
			const audioFiles = result.filter((file) => file.isFile() && file.name.endsWith('.mp3'))
			console.log('Starting metadata extraction')
			const updatedLibrary = await Promise.all(
				audioFiles.map(async (file, index) => {
					let track: TrackWithPlaylist = {
						id: String(index),
						url: 'file://' + file.path,
						title: file.name.replace('.mp3', ''),
						artwork: unknownTrackImageUri,
						artist: 'Unknown Artist',
						playlist: [],
					}
					if (
						!storeLibrary ||
						!storeLibrary.some((track: TrackWithPlaylist) => track.url === 'file://' + file.path)
					) {
						await new Promise((resolve, reject) => {
							new jsmediatags.Reader(file.path).setTagsToRead(['title', 'artist', 'picture']).read({
								onSuccess: (tag) => {
									const trackTags = tag.tags
									console.log(trackTags.artist)
									track.artist = trackTags.artist ?? 'Unknown Artist'
									track.title = trackTags.title ?? file.name.replace('.mp3', '')

									if (trackTags.picture) {
										let base64String = ''
										for (let i = 0; i < trackTags.picture.data.length; i++) {
											base64String += String.fromCharCode(trackTags.picture.data[i])
										}
										const img = `data:${trackTags.picture.format};base64,${window.btoa(
											base64String,
										)}`
										track.img = img
									}

									resolve(track)
								},
								onError: (error) => {
									console.log('Error reading tags for' + file.path + ':', error)
									reject(error)
								},
							})
						})
					} else if (storeLibrary) {
						track = storeLibrary.find((track) => track.url === 'file://' + file.path) ?? track
					}
					return track
				}),
			)

			// const updatedLibrary = audioFiles.map((file, index) => {
			// 	let track: TrackWithPlaylist = {
			// 		id: String(index),
			// 		url: 'file://' + file.path,
			// 		title: file.name.replace('.mp3', ''),
			// 		artwork: unknownTrackImageUri,
			// 		artist: 'Unknown Artist',
			// 		playlist: [],
			// 	}
			// 	new jsmediatags.Reader(file.path).setTagsToRead(['title', 'artist', 'picture']).read({
			// 		onSuccess: (tag) => {
			// 			const trackTags = tag.tags
			// 			console.log(trackTags.artist)
			// 			track.artist = trackTags.artist ?? 'Unknown Artist'
			// 			track.title = trackTags.title ?? file.name.replace('.mp3', '')

			// 			if (trackTags.picture) {
			// 				let base64String = ''
			// 				for (let i = 0; i < trackTags.picture.data.length; i++) {
			// 					base64String += String.fromCharCode(trackTags.picture.data[i])
			// 				}
			// 				const img = `data:${trackTags.picture.format};base64,${window.btoa(base64String)}`
			// 				track.img = img
			// 			}
			// 		},
			// 		onError: (error) => {
			// 			console.log('Error reading tags for' + file.path + ':', error)
			// 		},
			// 	})
			// 	return track
			// })
			MMKV.setArray('library', updatedLibrary)
			console.log('Done updating library')
			library = updatedLibrary
		} catch (error) {
			console.error('Directory Read Error: ', error)
		}
	}
}
