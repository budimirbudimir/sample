const initialState = {
	topArtists: [],
	fetchingTrending: false,
	fetchedTrending: false,
	target: {
		name: '',
		link: '',
		stats: {},
		bio: '',
		summary: '',
		image: '',
		similar: [],
		tags: [],
	},
	fetchingTarget: false,
	fetchedTarget: false,
	expanded: false,
	index: 0,
	error: null,
}

const navigator = (state = initialState, action) => {
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

export default navigator
