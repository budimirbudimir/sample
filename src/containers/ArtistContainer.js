import { connect } from 'react-redux'
import { compose, lifecycle, withState, withHandlers } from 'recompose'

import { toggleBio, addFavorite, removeFavorite, getFavorites } from '../actions'
import ArtistPage from '../components/Artist'

//#region REDUX CONNECTION
const mapStateToProps = state => ({
	target: state.artists.target,
	targetImage: state.artists.targetImage,
	expanded: state.artists.expanded,
	favoriteError: state.user.favoriteError,
	authedUserFavs: state.user.authedUserFavs,
})
const mapDispatchToProps = dispatch => ({
	addFavorite: (userID, artist) => dispatch(addFavorite(userID, artist)),
	removeFavorite: (userID, artistID) =>
		dispatch(removeFavorite(userID, artistID)),
	getFavorites: userID => dispatch(getFavorites(userID)),
	toggleBio: () => dispatch(toggleBio())
})
const withReduxConnection = connect(mapStateToProps, mapDispatchToProps)
//#endregion


//#region STATE CONNECTION
const withStateConnection = withState('isCurrentFavorite', 'setCurrentFavorite', false)
//#endregion


//#region FAVORITE ACTIONS
const withFavoriteActions = withHandlers({
	handleAddFavorite: ({ target, addFavorite, authedUserFavs, getFavorites }) => () => {
		const userID = localStorage.getItem('currentUser')

		if (userID)
			addFavorite(userID, target).then(() => {
				// If user had no favorites prior to adding this, pull new list when done with adding
				if (!authedUserFavs) getFavorites(userID)
			})
	},
	handleRemoveFavorite: ({ removeFavorite }) => (artistID) => {
		const userID = localStorage.getItem('currentUser')

		if (userID) removeFavorite(userID, artistID)
	}
})
//#endregion


//#region LIFECYCLE METHODS
const withLifecycleMethods = lifecycle({
	componentDidMount() {
		const { getFavorites, authedUserFavs, target, setCurrentFavorite } = this.props
		const userID = localStorage.getItem('currentUser')

		const currentFavs = authedUserFavs.map(fav => fav.id === target.mbid)
		const isCurrentFavorite = currentFavs.length > 0
		setCurrentFavorite(isCurrentFavorite)

		// Get favorite artists by user
		if (userID) getFavorites(userID)
	},
})
//#endregion


export default compose(
	withReduxConnection,
	withStateConnection,
	withFavoriteActions,
	withLifecycleMethods,
)(ArtistPage)
