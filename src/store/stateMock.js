// Set default props for target user initially
const initialTarget = {
	name: '',
	link: '',
	stats: {},
	bio: '',
	summary: '',
	image: '',
	similar: [],
	tags: [],
}

export const initialState = {
	topArtists: [],
	fetchingTrending: false,
	fetchedTrending: false,
	target: initialTarget,
	fetchingTarget: false,
	fetchedTarget: false,
	expanded: false,
	error: null,
	authedUserFavs: [],
	results: [],
}

export default initialState
