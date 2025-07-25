import { useEffect } from 'react'
import Animated, {
	cancelAnimation,
	Easing,
	StyleProps,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

export type MovingTextProps = {
	text: string
	animationThreshold: number
	style?: StyleProps
}

// Text animation when track titles get too long
export const MovingText = ({ text, animationThreshold, style }: MovingTextProps) => {
	const translateX = useSharedValue(0)
	const shouldAnimate = text.length >= animationThreshold

	const textWidth = text.length * 3

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		}
	})

	useEffect(() => {
		if (!shouldAnimate) return
		translateX.value = withDelay(
			1000,
			withRepeat(withTiming(-textWidth, { duration: 5000, easing: Easing.linear }), -1, true),
		)

		return () => {
			cancelAnimation(translateX)
			translateX.value = 0
		}
	}, [translateX, text, animationThreshold, shouldAnimate, textWidth])

	return (
		<Animated.Text
			numberOfLines={1}
			style={[
				style,
				animatedStyle,
				shouldAnimate && {
					width: 9999,
					paddingLeft: 16,
				},
			]}
		>
			{text}
		</Animated.Text>
	)
}
