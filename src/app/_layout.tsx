import { useState } from 'react'

import { getAudioFiles, getCurrentTrackIndex, library } from './player-service'

import { colors } from '@/constants/tokens'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { DownloadDirectoryPath } from 'react-native-fs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// Scan for MP3 files on device
getAudioFiles(DownloadDirectoryPath)

export const unstable_settings = {
	initialRouteName: '(tabs)',
}

export default function App() {
	const [currentIndex, setLocalIndex] = useState(getCurrentTrackIndex())
	const currentTrack = library[currentIndex]

	if (!currentTrack) return null

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<RootNavigation />
				<StatusBar style="auto" />
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
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

			<Stack.Screen
				name="(modals)/addToPlaylist"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerBackVisible: true,
					headerTintColor: colors.primary,
					headerTitle: 'Add To Playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>

			<Stack.Screen
				name="(modals)/createPlaylist"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerBackVisible: true,
					headerTintColor: colors.primary,
					headerTitle: 'Create New Playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>

			<Stack.Screen
				name="(modals)/deletePlaylist"
				options={{
					presentation: 'modal',
					headerStyle: {
						backgroundColor: colors.background,
					},
					headerBackVisible: true,
					headerTintColor: colors.primary,
					headerTitle: 'Delete Playlist',
					headerTitleStyle: {
						color: colors.text,
					},
				}}
			/>
		</Stack>
	)
}
