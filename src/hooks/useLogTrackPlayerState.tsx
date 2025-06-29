import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged]

export const useLogTrackPlayerState = () => {
	useTrackPlayerEvents(events, async (event) => {
		if (event.type === Event.PlaybackError) {
			console.warn('Error: ', event)
		}

		if (event.type === Event.PlaybackState) {
			console.log('Playback state: ', event.state)
		}
	})
}
