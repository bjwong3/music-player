import { library } from '@/app/player-service'
import { ArtistTracksList } from '@/components/ArtistTracksList'
import { Artist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

const ArtistDetailScreen = () => {
	const { name: artistName } = useLocalSearchParams<{ name: string }>()

	const artists = library.reduce((acc, track) => {
		const existingArtist = acc.find((artist) => artist.name === track.artist)

		if (existingArtist) {
			existingArtist.tracks.push(track)
		} else {
			acc.push({
				name: track.artist ?? 'Unknown',
				tracks: [track],
			})
		}

		return acc
	}, [] as Artist[])

	const artist = artists.find((artist) => artist.name === artistName)

	if (!artist) {
		console.warn(`Artist ${artistName} not found!`)

		return <Redirect href={'/(tabs)/artists'} />
	}

	return (
		<View style={defaultStyles.container}>
			<ArtistTracksList artist={artist} />
		</View>
	)
}

export default ArtistDetailScreen
