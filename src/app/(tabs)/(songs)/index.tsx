import library from '@/assets/data/library.json'
import { TracksList } from '@/components/TracksList'
import { colors, screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search',
		},
	})

	const filteredSongs = useMemo(() => {
		if (!search) return library

		return library.filter(trackTitleFilter(search))
	}, [search, library])

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 110,
				paddingBottom: 100,
				backgroundColor: colors.background,
			}}
		>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TracksList tracks={filteredSongs} scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}

export default SongsScreen
