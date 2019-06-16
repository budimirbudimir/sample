import React from 'react'
import { connect } from 'react-redux'
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
  mapProps
} from 'recompose'
import { omit } from 'ramda'

import { fetchTrending, setArtist, searchArtist, toggleBio } from '../actions'

import Artist from './Artist'
import Trending from './Trending'
import Search from './Search'
import '../styles/Search.css'
import '../styles/App.css'

const DROPDOWN_TIMEOUT = 300

// TODO: Organize these components better (param splitting)!

const Navigator = ({
  handleChange,
  handleKeypress,
  handleFocus,
  handleBlur,
  findArtist,
  fetchArtist,
  results,
  showDropdown,
  query,

  target,
  targetImage,
  toggleBio,
  expanded,

  topArtists
}) => {
  return (
    <div className="App-content_container">
      <div className="App-content">
        <Search
          change={handleChange}
          keypress={handleKeypress}
          focus={handleFocus}
          blur={handleBlur}
          findArtist={findArtist}
          fetchArtist={fetchArtist}
          results={results}
          showDropdown={showDropdown}
          query={query}
        />

        <Artist
          target={target}
          targetImage={targetImage}
          toggleBio={toggleBio}
          expanded={expanded}
          fetchArtist={fetchArtist}
        />
      </div>

      <Trending artists={topArtists} fetchArtist={fetchArtist} />
    </div>
  )
}

//#region NAVIGATION STATE
const withNavigatioState = compose(
  withState('query', 'setQuery', ''),
  withState('showDropdown', 'setDropdown', false)
)
//#endregion

//#region NAVIGATION HANDLERS
const withNavigationHandlers = withHandlers({
  handleFetchArtist: ({ setArtist }) => name => {
    setArtist(name) // Find and set target artist
  },
  findArtist: ({ query, fetchArtist }) => {
    fetchArtist(query) // Fetch artist data
  },
  handleChange: ({ setQuery }) => e => {
    setQuery(e.currentTarget.value) // Sync the current query locally
  },
  handleFocus: ({ setDropdown }) => () => {
    setDropdown(true)
  },
  handleBlur: ({ setDropdown }) => () => {
    setTimeout(() => {
      setDropdown(false)
    }, DROPDOWN_TIMEOUT)
  },
  handleKeypress: ({ findArtist, query, searchArtist }) => e => {
    if (e.key === 'Enter') {
      findArtist()
    } else {
      if (query.length >= 2) searchArtist(query)
    }
  }
})
//#endregion

//#region LIFECYCLE METHODS
const withLifecycleMethods = lifecycle({
  async componentDidMount() {
    const trendingFetched = await this.props.fetchTrending() // Get trending artists
    return trendingFetched.action.payload
  }
})
//#endregion

//#region REDUX CONNECTION
const mapStateToProps = state => ({
  target: state.artists.target,
  targetImage: state.artists.targetImage,
  expanded: state.artists.expanded,
  topArtists: state.artists.topArtists,
  results: state.artists.results
})
const mapDispatchToProps = dispatch => ({
  fetchTrending: () => dispatch(fetchTrending()),
  toggleBio: () => dispatch(toggleBio()),
  setArtist: name => dispatch(setArtist(name)),
  searchArtist: name => dispatch(searchArtist(name))
})
const withReduxConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)
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
