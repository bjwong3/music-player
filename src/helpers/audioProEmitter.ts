import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native'

import { logDebug } from '../helpers/audioProUtils'
import { AudioProEventType } from '../helpers/audioProValues'
import { useInternalStore } from '../hooks/useInternalStore'

import type { AudioProEvent } from '../types/audioProTypes'

const NativeAudioPro = NativeModules.AudioPro

/**
 * Event emitter for main audio player events
 * Used to communicate between native code and JavaScript
 */
export const emitter =
	Platform.OS === 'android' ? DeviceEventEmitter : new NativeEventEmitter(NativeAudioPro)

/**
 * Event emitter for ambient audio events
 * Used to communicate between native code and JavaScript
 */
export const ambientEmitter =
	Platform.OS === 'android' ? DeviceEventEmitter : new NativeEventEmitter(NativeAudioPro)

/**
 * Global listener for main audio player events
 * Handles debug logging and state updates
 */
emitter.addListener('AudioProEvent', (event: AudioProEvent) => {
	const { debug, debugIncludesProgress, updateFromEvent } = useInternalStore.getState()
	if (debug) {
		if (event.type !== AudioProEventType.PROGRESS || debugIncludesProgress) {
			logDebug('AudioProEvent', JSON.stringify(event))
		}
	}
	updateFromEvent(event)
})

/**
 * Global listener for ambient audio events
 * Handles debug logging
 */
ambientEmitter.addListener('AudioProAmbientEvent', (event) => {
	const { debug } = useInternalStore.getState()
	if (debug) {
		logDebug('AudioProAmbientEvent', JSON.stringify(event))
	}
})
