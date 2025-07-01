import { setCurrentTrackIndex } from '@/app/player-service'
import { utilsStyles } from '@/styles'
import { AudioProTrack } from '@/types/audioProTypes'
import { useState } from 'react'
import { FlatList, FlatListProps, View } from 'react-native'
import { useAudioPro } from 'react-native-audio-pro'
import { AudioPro } from '../helpers/audioPro'
import { TrackListItem } from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<unknown>> & {
	tracks: AudioProTrack[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
	const { state, position, duration, playingTrack, playbackSpeed, volume, error } = useAudioPro()
	const [needsTrackLoad, setNeedsTrackLoad] = useState(true)
	const [autoPlay, setAutoPlay] = useState(true)

	const handleTrackSelect = (track: AudioProTrack) => {
		console.log(track)

		// If stopped, or we need to load a new track, play the current track
		AudioPro.play(track, {
			autoPlay,
			// startTimeMs: 60000,
		})
		setCurrentTrackIndex(Number(track.id) - 1)
		setNeedsTrackLoad(false)
	}

	return (
		<FlatList
			renderItem={({ item }) => <TrackListItem track={item} onTrackSelect={handleTrackSelect} />}
			data={tracks}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 160, marginHorizontal: 20 }}
		/>
	)
}
