import { useEffect, useState } from 'react'

import { useAudioPro } from 'react-native-audio-pro'

import { AudioPro } from '../helpers/audioPro'
import { AudioProState } from '../helpers/audioProValues'
import {
	getAudioFiles,
	getCurrentTrackIndex,
	library,
	setCurrentTrackIndex,
} from './player-service'

import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { DownloadDirectoryPath } from 'react-native-fs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

getAudioFiles(DownloadDirectoryPath)

export default function App() {
	const [currentIndex, setLocalIndex] = useState(getCurrentTrackIndex())
	const currentTrack = library[currentIndex]
	const { position, duration, state, playingTrack, playbackSpeed, volume, error } = useAudioPro()

	// Sync the local index with the player service
	useEffect(() => {
		const index = getCurrentTrackIndex()
		if (index !== currentIndex) {
			setLocalIndex(index)
			// Mark that we need to load the track if it changed
			if (state !== AudioProState.PLAYING) {
				setNeedsTrackLoad(true)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]) // Re-sync when playback state changes

	// Reset needsTrackLoad when the track actually changes
	useEffect(() => {
		if (playingTrack?.id === currentTrack?.id) {
			setNeedsTrackLoad(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playingTrack?.id])

	// Update both local state and player service when changing tracks
	const updateCurrentIndex = (index: number) => {
		setLocalIndex(index)
		setCurrentTrackIndex(index)
	}

	// Track whether we need to load a new track before playing
	const [needsTrackLoad, setNeedsTrackLoad] = useState(true)

	// Track whether to autoPlay when loading a track
	const [autoPlay, setAutoPlay] = useState(true)

	if (!currentTrack) return null

	// Handle play/pause button press
	const handlePlayPause = () => {
		if (state === AudioProState.PLAYING) {
			// If playing, simply pause
			AudioPro.pause()
		} else if (state === AudioProState.PAUSED && !needsTrackLoad) {
			// If paused and we don't need to load a new track, resume
			AudioPro.resume()
		} else {
			AudioPro.configure({
				showNextPrevControls: true,
			})
			// If stopped, or we need to load a new track, play the current track
			AudioPro.play(currentTrack, {
				autoPlay,
				// startTimeMs: 60000,
			})
			setNeedsTrackLoad(false)
		}
	}

	const handleStop = () => {
		AudioPro.stop()
		setNeedsTrackLoad(true)
	}

	const handleClear = () => {
		AudioPro.clear()
		setNeedsTrackLoad(true)
	}

	const handleSeek = (value: number) => {
		AudioPro.seekTo(value)
	}

	const handlePrevious = () => {
		if (position > 5000) {
			// If we're more than 5 seconds into the track, seek to beginning
			AudioPro.seekTo(0)
		} else {
			// Otherwise, go to previous track
			const newIndex = currentIndex > 0 ? currentIndex - 1 : library.length - 1

			// Update the track index
			updateCurrentIndex(newIndex)

			// If we're currently playing or paused (but loaded), immediately load the new track
			if (state === AudioProState.PLAYING || state === AudioProState.PAUSED) {
				AudioPro.play(library[newIndex], {
					autoPlay,
				})
				setNeedsTrackLoad(false)
			} else {
				// Otherwise, mark that we need to load the track when play is pressed
				setNeedsTrackLoad(true)
			}
		}
	}

	const handleNext = () => {
		const newIndex = (currentIndex + 1) % library.length
		updateCurrentIndex(newIndex)

		// If we're currently playing or paused (but loaded), immediately load the new track
		if (state === AudioProState.PLAYING || state === AudioProState.PAUSED) {
			AudioPro.play(library[newIndex], { autoPlay })
			setNeedsTrackLoad(false)
		} else {
			// Otherwise, mark that we need to load the track when play is pressed
			setNeedsTrackLoad(true)
		}
	}

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<RootNavigation />
				<StatusBar style="auto" />
			</GestureHandlerRootView>
		</SafeAreaProvider>
		// <SafeAreaView style={styles.container}>
		// 	<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
		// 		<Image
		// 			source={
		// 				typeof currentTrack.artwork === 'number'
		// 					? currentTrack.artwork
		// 					: { uri: currentTrack.artwork }
		// 			}
		// 			style={styles.artwork}
		// 		/>
		// 		<Text style={styles.title}>{currentTrack.title}</Text>
		// 		<Text style={styles.artist}>{currentTrack.artist}</Text>
		// 		<View style={styles.sliderContainer}>
		// 			<Text style={styles.timeText}>{formatTime(position)}</Text>
		// 			<Slider
		// 				style={styles.slider}
		// 				minimumValue={0}
		// 				maximumValue={duration}
		// 				value={position}
		// 				minimumTrackTintColor="#1EB1FC"
		// 				maximumTrackTintColor="#8E8E93"
		// 				thumbTintColor="#1EB1FC"
		// 				onSlidingComplete={handleSeek}
		// 			/>
		// 			<Text style={styles.timeText}>{formatTime(Math.max(0, duration - position))}</Text>
		// 		</View>
		// 		<View style={styles.controlsRow}>
		// 			<TouchableOpacity onPress={handlePrevious}>
		// 				<Text style={styles.controlText}>prev</Text>
		// 			</TouchableOpacity>
		// 			{state === AudioProState.LOADING ? (
		// 				<View style={styles.loadingContainer}>
		// 					<ActivityIndicator size="large" color="#1EB1FC" />
		// 				</View>
		// 			) : (
		// 				<TouchableOpacity onPress={handlePlayPause}>
		// 					<Text style={styles.playPauseText}>
		// 						{state === AudioProState.PLAYING
		// 							? 'pause()'
		// 							: state === AudioProState.PAUSED && !needsTrackLoad
		// 							? 'resume()'
		// 							: 'play(track)'}
		// 					</Text>
		// 				</TouchableOpacity>
		// 			)}
		// 			<TouchableOpacity onPress={handleNext}>
		// 				<Text style={styles.controlText}>next</Text>
		// 			</TouchableOpacity>
		// 		</View>
		// 		<View style={styles.stopRow}>
		// 			<TouchableOpacity onPress={handleStop}>
		// 				<Text style={styles.controlText}>stop()</Text>
		// 			</TouchableOpacity>
		// 			<TouchableOpacity onPress={handleClear}>
		// 				<Text style={styles.controlText}>clear()</Text>
		// 			</TouchableOpacity>
		// 		</View>

		// 		<View style={styles.stopRow}>
		// 			<TouchableOpacity onPress={() => setAutoPlay(!autoPlay)}>
		// 				<Text style={styles.optionText}>
		// 					autoPlay: {/* eslint-disable-next-line react-native/no-inline-styles */}
		// 					<Text style={{ color: autoPlay ? '#90EE90' : '#FFA500' }}>
		// 						{autoPlay ? 'true' : 'false'}
		// 					</Text>
		// 				</Text>
		// 			</TouchableOpacity>
		// 			<Text style={styles.stateText}>
		// 				state: <Text style={{ color: getStateColor(state) }}>{state}</Text>
		// 			</Text>
		// 		</View>

		// 		{error && (
		// 			<View style={styles.errorContainer}>
		// 				<Text style={styles.errorText}>Error: {error.error}</Text>
		// 			</View>
		// 		)}
		// 	</ScrollView>
		// </SafeAreaView>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />

			<Stack.Screen
				name="player"
				options={{
					presentation: 'card',
					animation: 'slide_from_bottom',
					animationDuration: 50,
					headerShown: false,
				}}
			/>
		</Stack>
	)
}
