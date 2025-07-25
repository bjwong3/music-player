import { addNextToQueue, removeFromPlaylist } from '@/app/player-service'
import { AudioProTrack } from '@/types/audioProTypes'
import { MenuView } from '@react-native-menu/menu'
import { usePathname, useRouter } from 'expo-router'
import { PropsWithChildren } from 'react'
import { match } from 'ts-pattern'

type TrackShortcutsMenuProps = PropsWithChildren<{ track: AudioProTrack }>

// Functional component for adding or removing a track from a playlist
export const TrackShortcutsMenu = ({ track, children }: TrackShortcutsMenuProps) => {
	const router = useRouter()

	const isPlaylistRoute = usePathname().includes('/playlists')

	const playlistName = usePathname().replace('/playlists/', '')

	const handlePressAction = (id: string) => {
		match(id)
			.with('add-next-to-queue', () => {
				addNextToQueue(track as AudioProTrack)
			})
			.with('add-to-playlist', () => {
				router.push({ pathname: '../(modals)/addToPlaylist', params: { trackUrl: track.url } })
			})
			.with('remove-from-playlist', () => {
				removeFromPlaylist(String(track.url), playlistName)
				router.dismiss()
			})
			.otherwise(() => console.warn(`Unknown menu action ${id}`))
	}

	return (
		<MenuView
			onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
			actions={[
				{
					id: 'add-next-to-queue',
					title: isPlaylistRoute ? 'Remove from playlist' : 'Add next to queue',
					image: 'ic_menu_add',
				},
				{
					id: isPlaylistRoute ? 'remove-from-playlist' : 'add-to-playlist',
					title: isPlaylistRoute ? 'Remove from playlist' : 'Add to playlist',
					image: isPlaylistRoute ? 'ic_menu_delete' : 'ic_menu_add',
				},
			]}
		>
			{children}
		</MenuView>
	)
}
