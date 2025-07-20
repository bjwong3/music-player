// index.js - App Entry Point
import { useFocusEffect, useRouter } from 'expo-router'
import { AppRegistry, Text } from 'react-native'
import { expo as expoProperties } from '../../app.json'
import App from './_layout'
import { setupAudioPro } from './player-service'

// Register the React component
AppRegistry.registerComponent(expoProperties.name, () => App)

// Initialize audio logic OUTSIDE of React lifecycle
setupAudioPro()

export default function HomeScreen() {
	const router = useRouter()

	useFocusEffect(() => {
		router.replace('/(tabs)')
	})

	return <Text>Home Screen</Text>
}
