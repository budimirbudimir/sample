export const initialState = {
	authedUserFavs: [],
}

const user = (state = initialState, action) => {
	switch (action.type) {
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
		return state

	case 'ADD_FAVORITE_FULFILLED':
		return {
			...state,
			...{
				authedUserFavs:
						state.authedUserFavs &&
						state.authedUserFavs.concat({
							id: action.payload.mbid,
							name: action.payload.name,
							image: action.payload.image,
						}),
			},
		}

	case 'REMOVE_FAVORITE_FULFILLED':
		return {
			...state,
			...{
				authedUserFavs: state.authedUserFavs.filter(
					fav => fav.id !== action.payload,
				),
			},
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

export default user
