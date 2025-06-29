// index.js - App Entry Point
import { AppRegistry } from 'react-native'
import { expo as expoProperties } from '../../app.json'
import App from './_layout'
import { setupAudioPro } from './player-service'

// Register the React component
AppRegistry.registerComponent(expoProperties.name, () => App)

// Initialize audio logic OUTSIDE of React lifecycle
setupAudioPro()
