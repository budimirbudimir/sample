import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
  fetchTrending,
  setArtist,
  searchArtist,
  toggleBio
} from '../../redux/artists/actions'

import Artist from '../../components/Artist/Artist'
import Trending from '../../components/Trending/Trending'
import Search from '../../components/Search/Search'
import './Navigator.css'

const DROPDOWN_TIMEOUT = 300

// #region COMPONENT
const Navigator = ({
  match,
  fetchArtist,
  results,
  setArtist,
  searchArtist,
  target,
  targetImage,
  toggleBio,
  expanded,
  topArtists,
  fetchTrending
}) => {
  // Define state/handlers
  const [query, setQuery] = useState('')
  const [showDropdown, setDropdown] = useState(false)

  // Emulate lifecycle
  useEffect(() => {
    // Get trending artists
    fetchTrending()

    if (match.params.artistName) handleFetchArtist(match.params.artistName)
  }, [])

  // Handlers
  const handleFetchArtist = name => {
    // Find and set target artist
    setArtist(name)
  }

  const findArtist = () => {
    // Fetch artist data
    fetchArtist(query)
  }

  const handleChange = e => {
    // Sync the current query locally
    console.log('change', e)
    setQuery(e.currentTarget.value)
  }

  const handleFocus = () => {
    setDropdown(true)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setDropdown(false)
    }, DROPDOWN_TIMEOUT)
  }
  // TODO First run setQuery(), then findArtist()/searchArtist()
  const handleKeypress = e => {
    console.log('keypress', { key: e.key, query })
    if (e.key === 'Enter') {
      findArtist()
    } else {
      if (query.length >= 2) searchArtist(query)
    }
  }

  return (
    <div className="App-content_container">
      <div className="App-content">
        <Search
          change={handleChange}
          keypress={handleKeypress}
          focus={handleFocus}
          blur={handleBlur}
          findArtist={findArtist}
          fetchArtist={handleFetchArtist}
          results={results}
          showDropdown={showDropdown}
          query={query}
        />

        <Artist
          target={target}
          targetImage={targetImage}
          toggleBio={toggleBio}
          expanded={expanded}
          fetchArtist={handleFetchArtist}
        />
      </div>

      <Trending artists={topArtists} fetchArtist={handleFetchArtist} />
    </div>
  )
}
// #endregion

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
//#endregion

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigator)
