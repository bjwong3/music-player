import { addNextToQueue, addToQueue, clearQueue, setCurrentTrackIndex } from '@/app/player-service'
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
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ id, tracks, ...flatListProps }: TracksListProps) => {
	const [autoPlay, setAutoPlay] = useState(true)

	const queueOffset = useRef(0)
	const { activeQueueId, setActiveQueueId } = useQueue()

	const handleTrackSelect = (selectedTrack: AudioProTrack) => {
		const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

		if (trackIndex === -1) return

		const isQueueChanging = id !== activeQueueId

		const beforeTracks = tracks.slice(0, trackIndex)
		const afterTracks = tracks.slice(trackIndex + 1)

		clearQueue()
		addNextToQueue(selectedTrack)
		addToQueue(afterTracks)
		addToQueue(beforeTracks)

		AudioPro.play(selectedTrack, { autoPlay })

		queueOffset.current
		setActiveQueueId(id)
		setCurrentTrackIndex(0)
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
