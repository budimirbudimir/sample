import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchTrending, fetchTopTracks, setArtist } from '../actions'

import TopTracks from './TopTracks'
import Trending from './Trending'

import '../styles/Home.css'

// #region COMPONENT
const Home = ({ topArtists, topTracks, fetchTrending, fetchTopTracks }) => {
  useEffect(() => {
    fetchTrending() // Get trending artists
    fetchTopTracks() // Get trending tracks
  }, [])

  return (
    <div className="Home">
      <div className="Home-inner">
        <h3>
          Welcome to Last.fm Navigator! <br />
          These are currently trending tracks:
        </h3>

        <TopTracks tracks={topTracks} />
      </div>

      <Trending artists={topArtists} fetchArtist={null} />
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
