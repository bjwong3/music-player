import { shuffle } from '@/app/player-service'
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

// Display selected artist's tracks
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
		<View style={{ paddingBottom: 33 }}>
			<TracksList
				id={generateTracksListId(artist.name, search)}
				shuffle={shuffle}
				ListHeaderComponentStyle={styles.artistHeaderContainer}
				ListHeaderComponent={
					<View>
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
				}
				tracks={filteredArtistTracks}
			/>
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
