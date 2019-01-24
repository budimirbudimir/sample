import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'

import { fetchTrending, fetchTopTracks, setArtist } from '../actions'
import Home from '../components/Home'
import '../styles/Home.css'


//#region COMPONENT ACTIONS
const withComponentActions = withHandlers({
	fetchArtist: name => setArtist(name)
})
//#endregion


//#region LIFECYCLE METHODS
const withLifecycleMethods = lifecycle({
	componentDidMount() {
		this.props.fetchTrending() // Get trending artists
		this.props.fetchTopTracks() // Get trending tracks
	}
})
//#endregion


//#region REDUX CONNECTION
const mapStateToProps = state => ({
	topArtists: state.artists.topArtists,
	topTracks: state.artists.topTracks,
})
const mapDispatchToProps = dispatch => ({
	fetchTrending: () => dispatch(fetchTrending()),
	fetchTopTracks: () => dispatch(fetchTopTracks()),
	setArtist: name => dispatch(setArtist(name)),
})
const withReduxConnection = connect(mapStateToProps, mapDispatchToProps)
//#endregion


export default compose(
	withReduxConnection,
	withComponentActions,
	withLifecycleMethods,
)(Home)
