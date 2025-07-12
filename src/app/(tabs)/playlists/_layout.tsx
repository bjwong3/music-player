import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import { Text, View } from 'react-native'

const PlaylistsScreen = () => {
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Search Playlists',
		},
	})
	return (
		<View style={defaultStyles.container}>
			<Text style={defaultStyles.text}>Playlists screen</Text>
		</View>
	)
}

export default PlaylistsScreen
