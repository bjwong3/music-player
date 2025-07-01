import library from '@/assets/data/library.json'
import { TracksList } from '@/components/TracksList'
import { colors } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useMemo } from 'react'
import { View } from 'react-native'

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
				paddingBottom: 30,
				backgroundColor: colors.background,
			}}
		>
			<TracksList tracks={filteredSongs} scrollEnabled={false} />
		</View>
	)
}

export default SongsScreen
