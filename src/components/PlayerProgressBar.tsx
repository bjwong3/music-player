import { colors, fontSize } from '@/constants/tokens'
import { AudioPro } from '@/helpers/audioPro'
import { millisToMinutesAndSeconds } from '@/helpers/miscellaneous'
import { defaultStyles, utilsStyles } from '@/styles'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import { useAudioPro } from 'react-native-audio-pro'
import { Slider } from 'react-native-awesome-slider'
import {
	configureReanimatedLogger,
	ReanimatedLogLevel,
	useSharedValue,
} from 'react-native-reanimated'

// Currently playing track progress component
export const PlayerProgressBar = ({ style }: ViewProps) => {
	const { state, position, duration, playingTrack, playbackSpeed, volume, error } = useAudioPro()

	configureReanimatedLogger({
		level: ReanimatedLogLevel.warn,
		strict: false, // Reanimated runs in strict mode by default
	})

	const isSliding = useSharedValue(false)
	const progress = useSharedValue(0)
	const min = useSharedValue(0)
	const max = useSharedValue(1)

	const trackElapsedTime = millisToMinutesAndSeconds(position)
	const trackRemainingTime = millisToMinutesAndSeconds(duration - position)

	if (!isSliding.value) {
		progress.value = duration > 0 ? position / duration : 0
	}

	return (
		<View style={style}>
			<Slider
				progress={progress}
				minimumValue={min}
				maximumValue={max}
				containerStyle={utilsStyles.slider}
				renderBubble={() => null}
				onSlidingStart={() => (isSliding.value = true)}
				onSlidingComplete={async (value) => {
					// If user isn't sliding, don't update position
					if (!isSliding.value) return

					isSliding.value = false
					await AudioPro.seekTo(value * duration)
				}}
				thumbWidth={0}
				theme={{
					minimumTrackTintColor: colors.minimumTrackTintColor,
					maximumTrackTintColor: colors.maximumTrackTintColor,
				}}
			/>

			<View style={styles.timeRow}>
				<Text style={styles.timeText}>{trackElapsedTime}</Text>

				<Text style={styles.timeText}>
					{'-'} {trackRemainingTime}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		marginTop: 20,
	},
	timeText: {
		...defaultStyles.text,
		color: colors.text,
		opacity: 0.75,
		fontSize: fontSize.xs,
		letterSpacing: 0.7,
		fontWeight: '500',
	},
})
