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
	results: [],
}

const artists = (state = initialState, action) => {
	switch (action.type) {
	// Trending section actions
	case 'FETCH_TRENDING_PENDING':
		return {
			...state,
			...{ fetchingTrending: true },
		}
	case 'FETCH_TRENDING_REJECTED':
		return {
			...state,
			...{ fetchingTrending: false, error: action.payload },
		}
	case 'FETCH_TRENDING_FULFILLED':
		return {
			...state,
			...{
				topArtists: action.payload.data.artists.artist,
				fetchingTrending: false,
				fetchedTrending: true,
			},
		}

		// Current artist section actions
	case 'SET_ARTIST_PENDING':
		return {
			...state,
			...{ fetchingTarget: true },
		}
	case 'SET_ARTIST_REJECTED':
		return {
			...state,
			...{ fetchingTarget: false, error: action.payload },
		}
	case 'SET_ARTIST_FULFILLED':
		return {
			...state,
			...{
				target: action.payload.data.artist,
				targetImage: action.payload.data.artist.image['3']['#text'],
				fetchingTarget: false,
				fetchedTarget: true,
			},
		}

		// Search!
	case 'SEARCH_ARTIST_FULFILLED':
		return {
			...state,
			...{
				results: action.payload.data.results.artistmatches.artist,
				// targetImage:
				// action.payload.data.result.artistmatches.artist.image['3']['#text'],
				// fetchingTarget: false,
				// fetchedTarget: true,
			},
		}

		// UI actions
	case 'TOGGLE_BIO':
		return {
			...state,
			...{ expanded: !state.expanded },
		}

		// Fallback functionality
	default:
		return state
	}
}

export default artists
