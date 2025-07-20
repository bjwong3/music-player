import { playNextTrack, playPreviousTrack, shuffle, toggleShuffle } from '@/app/player-service'
import { colors } from '@/constants/tokens'
import { AudioPro } from '@/helpers/audioPro'
import { FontAwesome6 } from '@expo/vector-icons'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { AudioProState, useAudioPro } from 'react-native-audio-pro'

type PlayerControlsProps = {
	style?: ViewStyle
}

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
	return (
		<View style={[styles.container, style]}>
			<View style={{ alignItems: 'center', marginBottom: 30 }}>
				<ShuffleButton />
			</View>
			<View style={styles.row}>
				<PreviousButton />
				<PlayPauseButton />
				<NextButton />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ style, iconSize = 48 }: PlayerButtonProps) => {
	const { state, position, duration, playingTrack, playbackSpeed, volume, error } = useAudioPro()
	const playing = state === AudioProState.PLAYING

	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity activeOpacity={0.85} onPress={playing ? AudioPro.pause : AudioPro.resume}>
				<FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
			</TouchableOpacity>
		</View>
	)
}

export const NextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={playNextTrack}>
			<FontAwesome6 name="forward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const PreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	const { state, position, duration, playingTrack, playbackSpeed, volume, error } = useAudioPro()
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => playPreviousTrack(position)}>
			<FontAwesome6 name="backward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}

export const ShuffleButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	const [shuffleEnabled, setShuffleEnabled] = useState(shuffle)
	const handleShufflePress = () => {
		setShuffleEnabled(!shuffleEnabled)
		toggleShuffle()
	}
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={handleShufflePress}>
			<FontAwesome6
				name="shuffle"
				size={iconSize}
				color={shuffleEnabled ? colors.text : colors.textMuted}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
})
