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

const initialState = {
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

		// USER actions
	case 'AUTH_FULFILLED':
		// TODO: Handle logic.
		return state
	case 'AUTH_REJECTED':
		// TODO: Handle error.
		return state

	case 'LOGIN_FULFILLED':
		// Save current user to the state
		return state
	case 'LOGIN_REJECTED':
		// Remove current user from the state, TODO: Handle error.
		return state

	case 'LOGOUT_FULFILLED':
		// Remove current user from the state, TODO: Handle error.
		return state

	case 'RESET_PASSWORD_FULFILLED':
		// TODO: Handle logic.
		return state

	case 'SAVE_USER':
		// TODO: Handle logic.
		console.log('SAVE)USER from reducer', action.payload)
		return state

	case 'ADD_FAVORITE_FULFILLED':
		return {
			...state,
			...{
				authedUserFavs: state.authedUserFavs.concat({
					id: action.payload.mbid,
					name: action.payload.name,
				}),
			},
		}

	case 'REMOVE_FAVORITE_FULFILLED':
		console.log(action.payload)
		return {
			...state,
			...{ authedUserFavs: state.authedUserFavs },
		}

	case 'GET_FAVORITES_FULFILLED':
		return {
			...state,
			...{ authedUserFavs: action.payload && Object.values(action.payload) },
		}

		// Fallback functionality
	default:
		return state
	}
}

export default navigator
