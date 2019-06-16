import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
// import { withHandlers } from 'recompose'

import { fetchTrending, fetchTopTracks, setArtist } from '../actions'

import TopTracks from './TopTracks'
import Trending from './Trending'

import '../styles/Home.css'

// #region COMPONENT
const Home = ({ topArtists, topTracks, fetchTrending, fetchTopTracks }) => {
  useEffect(() => {
    const trendingArtists = fetchTrending() // Get trending artists
    const topTracks = fetchTopTracks() // Get trending tracks
    console.log({ trendingArtists, topTracks })
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

// #region COMPONENT ACTIONS
// const withComponentActions = withHandlers({
//   // TODO Check the purpose of this one!
//   fetchArtist: name => setArtist(name)
// })
// #endregion

// #region LIFECYCLE METHODS
// const withLifecycleMethods = lifecycle({
//   async componentDidMount() {
//     const trendingArtists = await this.props.fetchTrending() // Get trending artists
//     const topTracks = await this.props.fetchTopTracks() // Get trending tracks
//     console.log({ trendingArtists, topTracks })
//   }
// })
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
const withReduxConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)
// #endregion

export default compose(
  withReduxConnection
  // withComponentActions
  // withLifecycleMethods
)(Home)
