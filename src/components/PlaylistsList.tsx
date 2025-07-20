import { unknownTrackImageUri } from '@/constants/images'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { utilsStyles } from '@/styles'
import FastImage from '@d11/react-native-fast-image'
import { useMemo } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import { PlaylistListItem } from './PlaylistListItem'

// Playlist tab component displaying all playlists
type PlaylistsListProps = {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginLeft: 80, marginVertical: 12 }} />
)

export const PlaylistsList = ({
	playlists,
	onPlaylistPress: handlePlaylistPress,
	...flatListProps
}: PlaylistsListProps) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search playlist',
		},
	})

	const filteredPlaylist = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [playlists, search])

	return (
		<FlatList
			contentContainerStyle={{ paddingTop: 20, paddingBottom: 128 }}
			ItemSeparatorComponent={ItemDivider}
			ListEmptyComponent={
				<View>
					<Text style={utilsStyles.emptyContentText}>No playlist found</Text>

					<FastImage
						source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal }}
						style={utilsStyles.emptyContentImage}
					/>
				</View>
			}
			data={filteredPlaylist}
			renderItem={({ item: playlist }) => (
				<PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
			)}
			{...flatListProps}
		/>
	)
}
