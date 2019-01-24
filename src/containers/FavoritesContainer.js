import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'

import { getFavorites, removeFavorite } from '../actions'
import Favorites from '../components/Favorites'
import '../styles/Favorites.css'


//#region COMPONENT METHODS
const withComponentHandlers = withHandlers({
	handleRemoveFavorite: ({ removeFavorite }) => (artistID) => {
		const userID = localStorage.getItem('currentUser')

		// Get favorite artists by user
		if (userID) removeFavorite(userID, artistID)
	}
})
//#endregion


//#region LIFECYCLE METHODS
const withLifecycleMethods = lifecycle({
	componentDidMount() {
		const userID = localStorage.getItem('currentUser')

		// Get favorite artists by user
		if (userID) this.props.getFavorites(userID)
	}
})
//#endregion


//#region REDUX CONNECTION
const mapStateToProps = state => ({
	authedUserFavs: state.user.authedUserFavs,
})
const mapDispatchToProps = dispatch => ({
	getFavorites: userID => dispatch(getFavorites(userID)),
	removeFavorite: (userID, artistID) => dispatch(removeFavorite(userID, artistID)),
})
const withReduxConnection = connect(mapStateToProps, mapDispatchToProps)
//#endregion


export default compose(
	withReduxConnection,
	withComponentHandlers,
	withLifecycleMethods,
)(Favorites)
