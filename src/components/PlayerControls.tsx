import { playNextTrack, playPreviousTrack } from '@/app/player-service'
import { colors } from '@/constants/tokens'
import { AudioPro } from '@/helpers/audioPro'
import { FontAwesome6 } from '@expo/vector-icons'
import { TouchableOpacity, View, ViewStyle } from 'react-native'
import { AudioProState, useAudioPro } from 'react-native-audio-pro'

type PlayerControlsProps = {
	style?: ViewStyle
}

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayPauseButton = ({ style, iconSize }: PlayerButtonProps) => {
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
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={playPreviousTrack}>
			<FontAwesome6 name="backward" size={iconSize} color={colors.text} />
		</TouchableOpacity>
	)
}
