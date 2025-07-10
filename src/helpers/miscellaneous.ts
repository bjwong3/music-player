export const millisToMinutesAndSeconds = (millis: number) => {
	var minutes = Math.floor(millis / 60000)
	var seconds = ((millis % 60000) / 1000).toFixed(0)
	return Number(seconds) == 60
		? minutes + 1 + ':00'
		: minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds
}

export const generateTracksListId = (trackListName: string, search?: string) => {
	return `${trackListName}${`-${search}` || ''}`
}
