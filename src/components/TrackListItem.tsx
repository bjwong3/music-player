import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/tokens'
import { AudioProState } from '@/helpers/audioProValues'
import { TrackWithPlaylist } from '@/helpers/types'
import { defaultStyles } from '@/styles'
import FastImage from '@d11/react-native-fast-image'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { useAudioPro } from 'react-native-audio-pro'
import LoaderKitView from 'react-native-loader-kit'

export type TrackListItemProps = {
	track: TrackWithPlaylist
	onTrackSelect: (track: TrackWithPlaylist) => void
}

export const TrackListItem = ({ track, onTrackSelect: handleTrackSelect }: TrackListItemProps) => {
	const { state, position, duration, playingTrack, playbackSpeed, volume, error } = useAudioPro()
	const isActiveTrack = playingTrack?.id === track.id
	const isPlaying = state === AudioProState.PLAYING

	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={styles.trackItemContainer}>
				<View>
					<FastImage
						source={{
							uri: track.img ?? unknownTrackImageUri,
							priority: FastImage.priority.normal,
						}}
						style={{
							...styles.trackArtworkImage,
							opacity: isActiveTrack ? 0.6 : 1,
						}}
					/>

					{isActiveTrack &&
						(isPlaying ? (
							<LoaderKitView
								style={styles.trackPlayingIconIndicator}
								name="LineScaleParty"
								color={colors.icon}
							/>
						) : (
							<Ionicons
								style={styles.trackPausedIconIndicator}
								name="play"
								size={24}
								color={colors.icon}
							/>
						))}
				</View>

				{/* Track title and artist */}
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{ width: '100%' }}>
						<Text
							numberOfLines={1}
							style={{
								...styles.trackTitleText,
								color: isActiveTrack ? colors.primary : colors.text,
							}}
						>
							{track.title}
						</Text>

						{track.artist && (
							<Text numberOfLines={1} style={styles.trackArtistText}>
								{track.artist}
							</Text>
						)}
					</View>

					<Entypo name="dots-three-horizontal" size={20} style={{ color: 'white' }} />
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 14,
		left: 13,
		width: 24,
		height: 24,
	},
	trackPausedIconIndicator: {
		position: 'absolute',
		top: 14,
		left: 14,
	},
})
