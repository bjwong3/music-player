import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import { Track } from 'react-native-track-player'
import { TrackListItem } from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<unknown>> & {
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ tracks, ...flatListProps }: TracksListProps) => {
	const handleTrackSelect = (track: Track) => {
		console.log(track)
	}

	return (
		<FlatList
			renderItem={({ item }) => <TrackListItem track={item} onTrackSelect={handleTrackSelect} />}
			data={tracks}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
		/>
	)
}
