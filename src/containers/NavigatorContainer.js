import { connect } from 'react-redux'
import { compose, withState, withHandlers, lifecycle, mapProps } from 'recompose'
import { omit } from 'ramda'

import { fetchTrending, setArtist, searchArtist, toggleBio } from '../actions'
import Navigator from '../components/Navigator'
import '../styles/App.css'
import '../styles/Search.css'

const DROPDOWN_TIMEOUT = 300


//#region NAVIGATION STATE
const withNavigatioState = compose(
	withState('query', 'setQuery', ''),
	withState('showDropdown', 'setDropdown', false)
)
//#endregion


//#region NAVIGATION HANDLERS
const withNavigationHandlers = withHandlers({
	handleFetchArtist: ({ setArtist }) => (name) => {
		setArtist(name) // Find and set target artist
	},
	findArtist: ({ query, fetchArtist }) => {
		fetchArtist(query) // Fetch artist data
	},
	handleChange: ({ setQuery }) => (e) => {
		setQuery(e.currentTarget.value) // Sync the current query locally
	},
	handleFocus: ({ setDropdown }) => () => {
		setDropdown(true)
	},
	handleBlur: ({ setDropdown }) => () => {
		setTimeout(() => { setDropdown(false) }, DROPDOWN_TIMEOUT)
	},
	handleKeypress: ({ findArtist, query, searchArtist }) => (e) => {
		if (e.key === 'Enter') {
			findArtist()
		} else {
			if (query.length >= 2) searchArtist(query)
		}
	},
})
//#endregion


//#region LIFECYCLE METHODS
const withLifecycleMethods = lifecycle({
	componentDidMount() {
		this.props.fetchTrending() // Get trending artists
	}
})
//#endregion


//#region REDUX CONNECTION
const mapStateToProps = state => ({
	target: state.artists.target,
	targetImage: state.artists.targetImage,
	expanded: state.artists.expanded,
	topArtists: state.artists.topArtists,
	results: state.artists.results,
})
const mapDispatchToProps = dispatch => ({
	fetchTrending: () => dispatch(fetchTrending()),
	toggleBio: () => dispatch(toggleBio()),
	setArtist: name => dispatch(setArtist(name)),
	searchArtist: name => dispatch(searchArtist(name)),
})
const withReduxConnection = connect(mapStateToProps, mapDispatchToProps)
//#endregion


//#region PROPS MAPPER
const withPropsMapper = mapProps(props => ({
	...omit(['fetchArtist', 'searchArtist'], props),
  fetchArtist: props.handleFetchArtist
}))
//#endregion


export default compose(
	withReduxConnection,
	withNavigatioState,
	withNavigationHandlers,
	withLifecycleMethods,
	withPropsMapper
)(Navigator)
