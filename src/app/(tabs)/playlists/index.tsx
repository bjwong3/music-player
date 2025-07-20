import { playlists } from '@/app/player-service'
import { PlaylistListControls } from '@/components/PlaylistListControls'
import { PlaylistsList } from '@/components/PlaylistsList'
import { colors, screenPadding } from '@/constants/tokens'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useRouter } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const PlaylistsScreen = () => {
	const router = useRouter()

	const [tabPlaylists, setTabPlaylists] = useState(playlists)

	useEffect(() => {
		setTabPlaylists(playlists)
	}, [playlists])

	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlists',
		},
	})

	const filteredPlaylists = useMemo(() => {
		return tabPlaylists.filter(playlistNameFilter(search))
	}, [tabPlaylists, search])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.push(`/(tabs)/playlists/${playlist.name}`)
	}

	return (
		<View
			style={{
				flex: 1,
				paddingTop: 90,
				paddingBottom: 30,
				backgroundColor: colors.background,
			}}
		>
			<PlaylistListControls style={{ marginHorizontal: 20 }} />
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{
					paddingHorizontal: screenPadding.horizontal,
				}}
			>
				<PlaylistsList
					scrollEnabled={false}
					playlists={filteredPlaylists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}

export default PlaylistsScreen
