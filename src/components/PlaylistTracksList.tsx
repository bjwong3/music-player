import { shuffle } from '@/app/player-service'
import { fontSize } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import FastImage from '@d11/react-native-fast-image'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { QueueControls } from './QueueControls'
import { TracksList } from './TracksList'

// Displays tracks for currently selected playlist
export const PlaylistTracksList = ({ playlist }: { playlist: Playlist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Find in playlist',
		},
	})

	const filteredPlaylistTracks = useMemo(() => {
		return playlist.tracks.filter(trackTitleFilter(search))
	}, [playlist.tracks, search])

	return (
		<View style={{ paddingBottom: 33 }}>
			<TracksList
				id={generateTracksListId(playlist.name, search)}
				shuffle={shuffle}
				ListHeaderComponentStyle={styles.playlistHeaderContainer}
				ListHeaderComponent={
					<View>
						<View style={styles.artworkImageContainer}>
							<FastImage
								source={{
									uri: playlist.artworkPreview,
									priority: FastImage.priority.high,
								}}
								style={styles.artworkImage}
							/>
						</View>

						<Text numberOfLines={1} style={styles.playlistNameText}>
							{playlist.name}
						</Text>

						{search.length === 0 && (
							<QueueControls style={{ paddingTop: 24 }} tracks={playlist.tracks} />
						)}
					</View>
				}
				tracks={filteredPlaylistTracks}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	playlistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 300,
	},
	artworkImage: {
		width: '85%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	playlistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
