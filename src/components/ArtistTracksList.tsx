import { unknownArtistImageUri } from '@/constants/images'
import { fontSize } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { Artist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import FastImage from '@d11/react-native-fast-image'
import { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { QueueControls } from './QueueControls'
import { TracksList } from './TracksList'

export const ArtistTracksList = ({ artist }: { artist: Artist }) => {
	const search = useNavigationSearch({
		searchBarOptions: {
			hideWhenScrolling: true,
			placeholder: 'Search songs',
		},
	})

	const filteredArtistTracks = useMemo(() => {
		return artist.tracks.filter(trackTitleFilter(search))
	}, [artist.tracks, search])

	return (
		<View>
			<View style={{ paddingBottom: 20 }}>
				<View style={styles.artworkImageContainer}>
					<FastImage
						source={{
							uri: unknownArtistImageUri,
							priority: FastImage.priority.high,
						}}
						style={styles.artistImage}
					/>
				</View>

				<Text numberOfLines={1} style={styles.artistNameText}>
					{artist.name}
				</Text>

				{search.length === 0 && (
					<QueueControls tracks={filteredArtistTracks} style={{ paddingTop: 24 }} />
				)}
			</View>
			<View style={{ paddingBottom: 525 }}>
				<TracksList
					id={generateTracksListId(artist.name, search)}
					scrollEnabled={false}
					tracks={filteredArtistTracks}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	artistHeaderContainer: {
		flex: 1,
		marginBottom: 32,
	},
	artworkImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: 100,
	},
	artistImage: {
		width: '25%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 128,
	},
	artistNameText: {
		...defaultStyles.text,
		marginTop: 22,
		textAlign: 'center',
		fontSize: fontSize.lg,
		fontWeight: '800',
	},
})
