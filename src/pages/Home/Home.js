import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  fetchTrending,
  fetchTopTracks,
  setArtist
} from '../../redux/artists/actions'

import TopTracks from '../../components/TopTracks/TopTracks'
import Trending from '../../components/Trending/Trending'

import './Home.css'

// #region COMPONENT
const Home = ({
  history,
  topArtists,
  topTracks,
  fetchTrending,
  fetchTopTracks
}) => {
  useEffect(() => {
    fetchTrending() // Get trending artists
    fetchTopTracks() // Get trending tracks
  }, [])

  const handleGoToArtistInfo = artistID => {
    return history.push(`/navigator/${artistID}`)
  }

  return (
    <div className="Home">
      <div className="Home-inner">
        <h3>
          Welcome to Last.fm Navigator! <br />
          These are currently trending tracks:
        </h3>

        <TopTracks goTo={handleGoToArtistInfo} tracks={topTracks} />
      </div>

      <Trending goTo={handleGoToArtistInfo} artists={topArtists} />
    </div>
  )
}
// #endregion

// #region REDUX CONNECTION
// NOTE Use connect() whenever possible as it offers
// out of the box optimization/memoization
const mapStateToProps = state => ({
  topArtists: state.artists.topArtists,
  topTracks: state.artists.topTracks
})
const mapDispatchToProps = dispatch => ({
  fetchTrending: () => dispatch(fetchTrending()),
  fetchTopTracks: () => dispatch(fetchTopTracks()),
  setArtist: name => dispatch(setArtist(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
