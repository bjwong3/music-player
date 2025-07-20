import { colors } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Entypo } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'

type QueueControlsProps = {} & ViewProps

// Create and delete playlist buttons
export const PlaylistListControls = ({ style, ...viewProps }: QueueControlsProps) => {
	const router = useRouter()

	const handleCreate = () => {
		router.push(`../(modals)/createPlaylist`)
	}

	const handleDelete = async () => {
		router.push(`../(modals)/deletePlaylist`)
	}

	return (
		<View style={[{ flexDirection: 'row', columnGap: 16 }, style]} {...viewProps}>
			{/* Create Playlist Button */}
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handleCreate} activeOpacity={0.8} style={styles.button}>
					<Entypo name="squared-plus" size={22} color={colors.primary} />
					<Text style={styles.buttonText}>Create Playlist</Text>
				</TouchableOpacity>
			</View>

			{/* Delete Playlist Button */}
			<View style={{ flex: 1 }}>
				<TouchableOpacity onPress={handleDelete} activeOpacity={0.8} style={styles.button}>
					<Entypo name="squared-minus" size={24} color={colors.primary} />
					<Text style={styles.buttonText}>Delete Playlist</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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
