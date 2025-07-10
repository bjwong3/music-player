import { QueueControls } from '@/components/QueueControls'
import { TracksList } from '@/components/TracksList'
import { colors } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useTracks } from '@/store/library'
import { useMemo } from 'react'
import { View } from 'react-native'

const SongsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search songs',
		},
	})

	const tracks = useTracks()

	const filteredSongs = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 90,
				paddingBottom: 30,
				backgroundColor: colors.background,
			}}
		>
			<QueueControls tracks={tracks} style={{ marginHorizontal: 20, paddingBottom: 20 }} />
			<TracksList
				id={generateTracksListId('songs', search)}
				tracks={filteredSongs}
				scrollEnabled={false}
			/>
		</View>
	)
}

export default SongsScreen
