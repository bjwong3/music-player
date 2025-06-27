import library from '@/assets/data/library.json'
import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import { TrackListItem } from './TrackListItem'

export type TracksListProps = Partial<FlatListProps<unknown>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TracksList = ({ ...flatListProps }: TracksListProps) => {
	return (
		<FlatList
			renderItem={({ item }) => <TrackListItem track={{ ...item, image: item.artwork }} />}
			data={library}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
		/>
	)
}
