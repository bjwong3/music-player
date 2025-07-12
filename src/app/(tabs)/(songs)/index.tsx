import { library } from '@/app/player-service'
import { QueueControls } from '@/components/QueueControls'
import { TracksList } from '@/components/TracksList'
import { colors } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useMemo } from 'react'
import { View } from 'react-native'

const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search songs',
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
				paddingTop: 90,
				paddingBottom: 30,
				backgroundColor: colors.background,
			}}
		>
			<QueueControls tracks={library} style={{ marginHorizontal: 20, paddingBottom: 20 }} />
			<TracksList
				id={generateTracksListId('songs', search)}
				tracks={filteredSongs.length !== 0 ? filteredSongs : []}
				scrollEnabled={false}
			/>
		</View>
	)
}

export default SongsScreen
