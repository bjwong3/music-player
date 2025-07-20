import {
	addNextToQueue,
	addToQueue,
	clearQueue,
	setCurrentTrackIndex,
	setQueue,
} from '@/app/player-service'
import { TrackWithPlaylist } from '@/helpers/types'
import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles'
import { AudioProTrack } from '@/types/audioProTypes'
import { useRef, useState } from 'react'
import { FlatList, FlatListProps, View } from 'react-native'
import { AudioPro } from '../helpers/audioPro'
import { TrackListItem } from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<unknown>> & {
	id: string
	tracks: TrackWithPlaylist[]
	shuffle: boolean
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

// Component for displaying tracks in a current tab
export const TracksList = ({ id, tracks, shuffle, ...flatListProps }: TracksListProps) => {
	const [autoPlay, setAutoPlay] = useState(true)

	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()

	const handleTrackSelect = (selectedTrack: AudioProTrack) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

		if (trackIndex === -1) return

		clearQueue()

		if (shuffle) {
			const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)
			setQueue(shuffledTracks)
			setCurrentTrackIndex(shuffledTracks.findIndex((track) => track.url === selectedTrack.url))
		} else {
			const beforeTracks = tracks.slice(0, trackIndex)
			const afterTracks = tracks.slice(trackIndex + 1)

			addNextToQueue(selectedTrack)
			addToQueue(afterTracks)
			addToQueue(beforeTracks)
			setCurrentTrackIndex(0)
		}

		AudioPro.play(selectedTrack, { autoPlay })

		queueOffset.current
		setActiveQueueId(id)
	}

	return (
		<FlatList
			renderItem={({ item }) => (
				<TrackListItem track={item as TrackWithPlaylist} onTrackSelect={handleTrackSelect} />
			)}
			data={tracks}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 160, marginHorizontal: 20 }}
			{...flatListProps}
		/>
	)
}
