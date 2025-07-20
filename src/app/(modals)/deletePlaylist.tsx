import { PlaylistsList } from '@/components/PlaylistsList'
import { colors, screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { deletePlaylist, playlists } from '../player-service'

const DeletePlaylistModal = () => {
	const router = useRouter()
	const headerHeight = useHeaderHeight()

	const handleDelete = async (playlist: Playlist) => {
		deletePlaylist(playlist)
		router.back()
	}

	return (
		<SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
			<PlaylistsList playlists={playlists} onPlaylistPress={handleDelete} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
	button: {
		padding: 12,
		backgroundColor: 'rgba(47, 47, 47, 0.5)',
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		columnGap: 8,
	},
	buttonText: {
		...defaultStyles.text,
		color: colors.primary,
		fontWeight: '600',
		fontSize: 18,
		textAlign: 'center',
	},
})

export default DeletePlaylistModal
