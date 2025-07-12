import { library } from '@/app/player-service'
import { unknownTrackImageUri } from '@/constants/images'
import { defaultStyles } from '@/styles'
import FastImage from '@d11/react-native-fast-image'
import { useRouter } from 'expo-router'
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native'
import { useAudioPro } from 'react-native-audio-pro'
import { MovingText } from './MovingText'
import { NextButton, PlayPauseButton, PreviousButton } from './PlayerControls'

export const FloatingPlayer = ({ style }: ViewProps) => {
	const { state, position, duration, playingTrack, playbackSpeed, volume, error } = useAudioPro()

	const router = useRouter()

	const handlePress = () => {
		router.navigate('/player')
	}

	if (!playingTrack) return null

	const displayedTrack = playingTrack

	const libraryTrack = library.find((track) => track.url === displayedTrack.url)

	return (
		<TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[styles.container, style]}>
			<>
				<FastImage
					source={{
						uri: libraryTrack ? libraryTrack.img ?? unknownTrackImageUri : unknownTrackImageUri,
					}}
					style={styles.trackArtworkImage}
				/>

				<View style={styles.trackTitleContainer}>
					<MovingText
						style={styles.trackTitle}
						text={displayedTrack.title}
						animationThreshold={25}
					/>
				</View>

				<View style={styles.trackControlsContainer}>
					<PreviousButton iconSize={22} />
					<PlayPauseButton iconSize={22} />
					<NextButton iconSize={22} />
				</View>
			</>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#252525',
		padding: 8,
		borderRadius: 12,
		paddingVertical: 10,
	},
	trackArtworkImage: {
		width: 40,
		height: 40,
		borderRadius: 8,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 10,
	},
	trackTitle: {
		...defaultStyles.text,
		fontSize: 18,
		fontWeight: '600',
		paddingLeft: 10,
	},
	trackControlsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		columnGap: 20,
		marginRight: 16,
		paddingLeft: 16,
	},
})
