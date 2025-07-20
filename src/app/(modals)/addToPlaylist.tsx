import { addToPlaylist, addToQueue, library, playlists } from '@/app/player-service'
import { PlaylistsList } from '@/components/PlaylistsList'
import { screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { useQueue } from '@/store/queue'
import { defaultStyles } from '@/styles'
import { AudioProTrack } from '@/types/audioProTypes'
import { useHeaderHeight } from '@react-navigation/elements'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AddToPlaylistModal = () => {
	const router = useRouter()
	const headerHeight = useHeaderHeight()

	const { activeQueueId } = useQueue()

	const { trackUrl } = useLocalSearchParams<{ trackUrl: AudioProTrack['url'] }>()

	const track = library.find((currentTrack) => trackUrl === currentTrack.url)

	// track was not found
	if (!track) {
		return null
	}

	const availablePlaylists = playlists.filter(
		(playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url),
	)

	const handlePlaylistPress = async (playlist: Playlist) => {
		addToPlaylist(track, playlist.name)

		if (activeQueueId?.startsWith(playlist.name)) {
			await addToQueue([track])
		}

		router.dismiss()
	}

	return (
		<SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
			<PlaylistsList playlists={availablePlaylists} onPlaylistPress={handlePlaylistPress} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})

export default AddToPlaylistModal
