import { unknownTrackImageUri } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import { Entypo } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createPlaylist } from '../player-service'

const CreatePlaylistModal = () => {
	const router = useRouter()
	const headerHeight = useHeaderHeight()
	const [playlistName, setPlaylistName] = useState('')

	const handleCreate = () => {
		const newPlaylist: Playlist = {
			name: playlistName,
			tracks: [],
			artworkPreview: unknownTrackImageUri,
		}
		createPlaylist(newPlaylist)
		router.back()
	}

	return (
		<SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
			<View style={{ gap: 16 }}>
				<TextInput
					placeholder="Playlist name"
					value={playlistName}
					onChangeText={setPlaylistName}
					style={{
						borderWidth: 1,
						borderColor: '#ccc',
						borderRadius: 8,
						padding: 12,
						fontSize: 16,
						color: '#ccc',
					}}
				/>
				<View>
					<TouchableOpacity onPress={handleCreate} activeOpacity={0.8} style={styles.button}>
						<Entypo name="plus" size={24} color={colors.primary} />
						<Text style={styles.buttonText}>Create</Text>
					</TouchableOpacity>
				</View>
			</View>
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

export default CreatePlaylistModal
