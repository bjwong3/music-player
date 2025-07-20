import { playlists } from '@/app/player-service'
import { PlaylistTracksList } from '@/components/PlaylistTracksList'
import { defaultStyles } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

const PlaylistScreen = () => {
	const { name: playlistName } = useLocalSearchParams<{ name: string }>()

	const playlist = playlists.find((playlist) => playlist.name === playlistName)

	if (!playlist) {
		console.warn(`Playlist ${playlistName} was not found!`)

		return <Redirect href={'/(tabs)/playlists'} />
	}

	return (
		<View style={defaultStyles.container}>
			<PlaylistTracksList playlist={playlist} />
		</View>
	)
}

export default PlaylistScreen
