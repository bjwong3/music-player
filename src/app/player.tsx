import { MovingText } from '@/components/MovingText'
import { PlayerControls } from '@/components/PlayerControls'
import { PlayerProgressBar } from '@/components/PlayerProgressBar'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize, screenPadding } from '@/constants/tokens'
import { usePlayerBackground } from '@/hooks/usePlayerBackground'
import { defaultStyles } from '@/styles'
import FastImage from '@d11/react-native-fast-image'
import { LinearGradient } from 'expo-linear-gradient'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useAudioPro } from 'react-native-audio-pro'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { library } from './player-service'

// Screen after clicking floating player
const PlayerScreen = () => {
	const { state, position, duration, playingTrack, playbackSpeed, volume, error } = useAudioPro()

	if (!playingTrack) return null

	const libraryTrack = library.find((track) => track.url === playingTrack.url)
	const trackArtwork = libraryTrack
		? libraryTrack.img ?? unknownTrackImageUri
		: unknownTrackImageUri
	const { imageColors } = usePlayerBackground(trackArtwork)

	const { top, bottom } = useSafeAreaInsets()

	if (!playingTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}
	return (
		<LinearGradient
			style={{ flex: 1 }}
			colors={
				imageColors
					? [imageColors.dominant, imageColors.vibrant]
					: [colors.background, colors.background]
			}
		>
			<View style={styles.overlayContainer}>
				<View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
					<View style={styles.artworkImageContainer}>
						<FastImage
							source={{
								uri: trackArtwork,
								priority: FastImage.priority.high,
							}}
							resizeMode="cover"
							style={styles.artworkImage}
						/>
					</View>

					<View style={{ flex: 1 }}>
						<View style={{ marginTop: 50 }}>
							<View style={{ height: 60 }}>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									{/* Track Title */}
									<View style={styles.trackTitleContainer}>
										<MovingText
											text={playingTrack.title ?? ''}
											animationThreshold={30}
											style={styles.trackTitleText}
										/>
									</View>
								</View>

								{/* Track Artist */}
								{playingTrack.artist && (
									<Text
										numberOfLines={1}
										style={[
											styles.trackArtistText,
											{
												marginTop: 6,
											},
										]}
									>
										{playingTrack.artist}
									</Text>
								)}
							</View>
							<PlayerProgressBar style={{ marginTop: 70 }} />

							<PlayerControls style={{ marginTop: 10 }} />
						</View>
					</View>
				</View>
			</View>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
	trackArtistText: {
		...defaultStyles.text,
		fontSize: fontSize.base,
		opacity: 0.8,
		maxWidth: '90%',
	},
})

export default PlayerScreen
