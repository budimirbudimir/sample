// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTrending, setArtist, toggleBio } from '../actions'
import '../styles/App.css'

import Header from './Header'
import Similar from './Similar'
import Tags from './Tags'
import Trending from './Trending'

import type { Artist, TopArtist } from '../models'

type PropsFromState = {
  // expanded points to current target artists bio state (show more/less)
  expanded: boolean,
  // topArtists is array containing all artists from Trending chart
  // with their relevant data
  topArtists: TopArtist[],
  // target is object containing all relevant target artist' data
  //TODO: Map type for target artist as well
  target: Artist,
  // targetImage is string representing target artist image URL
  targetImage: string,
}

type PropsFromDispatch = {
  // fetchTrending is action for fetching all Trending chart artists
  // together with their relevant data
  fetchTrending: () => void,
  // setArtist is action for fetching artist by current search query
  setArtist: (string) => void,
  // toggleBio is action for toggling current/target artist bio (show more/less)
  toggleBio: () => void,
}

type OwnState = {
  // query is current search query string entered in the input field
  query: string,
}

type Props = PropsFromState & PropsFromDispatch;

class App extends Component<Props, OwnState> {
  state = {
    query: '',
  }

  componentDidMount() {
    const { fetchTrending } = this.props;

    fetchTrending(); // Get trending artists
  }

  fetchArtist = (name: string) => {
    const { setArtist } = this.props;

    setArtist(name); // Find and set target artist
  }

  findArtist = () => {
    const { query } = this.state;

    this.fetchArtist(query)
  }

  render() {
    const {
      target,
      targetImage,
      topArtists,
      expanded,
      toggleBio
    } = this.props;

    return (
      <div className='App'>
        <Header />

        <div className='App-intro'>
          <input
            className='App-search'
            type='text'
            placeholder='Enter search query'
            onChange={(ev) => {
              // Sync the current query locally
              this.setState({ query: ev.target.value })
            }}
          />
          <button className='App-search-button' onClick={this.findArtist}>
            Search
          </button>

          {/* Render currently active artist */}
          {
            target.name !== '' &&
            <div className='App-info'>
              <div className='App-info_details'>
                <img src={ targetImage } alt='' />
              </div>

              <div className='App-info_bio'>
                <h2><a href={target.bio.links.link.href} target='blank' rel='noreferrer noopener'>{ target.name }</a></h2>
                <p>Listeners: { target.stats.listeners } / Total plays: { target.stats.playcount }</p>

                {
                  expanded
                  ? <p>
                      { target.bio.content } <br />
                      <a className='App-bio_link' onClick={toggleBio}>View Less</a>
                    </p>
                  : <p>
                      { target.bio.summary } <br />
                      <a className='App-bio_link' onClick={toggleBio}>View More</a>
                    </p>
                }

                <Similar similar={target.similar.artist} fetchArtist={this.fetchArtist} />
                <Tags tags={target.tags.tag} />
              </div>
            </div>
          }
        </div>

        <Trending artists={topArtists} fetchArtist={this.fetchArtist} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    target: state.navigator.target,
    targetImage: state.navigator.targetImage,
    expanded: state.navigator.expanded,
    topArtists: state.navigator.topArtists,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrending: () => dispatch(fetchTrending()),
    toggleBio: () => dispatch(toggleBio()),
    setArtist: (name) => dispatch(setArtist(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
