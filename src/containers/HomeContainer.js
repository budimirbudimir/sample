// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTrending, fetchTopTracks, setArtist } from '../actions/artists'
import type { TopArtist, TopTrack } from '../models'

import Home from '../components/Home'

import '../styles/Home.css'

type PropsFromState = {
	// topArtists is array containing all artists from Trending chart
	// with their relevant data
	topArtists: TopArtist[],
	// topTracks is array containing all tracks from Trending chart
	// with their relevant data
	topTracks: TopTrack[],
}

type PropsFromDispatch = {
	// fetchTrending is action for fetching all Trending chart artists
	// together with their relevant data
	fetchTrending: () => void,
	// fetchTopTracks is action for fetching all trending chart tracks
	// together with their relevant data
	fetchTopTracks: () => void,
	// setArtist is action for fetching artist by current search query
	setArtist: string => void,
}

type Props = PropsFromState & PropsFromDispatch

class HomeContainer extends Component<Props, null> {
	componentDidMount() {
		const { fetchTrending, fetchTopTracks } = this.props

		fetchTrending() // Get trending artists
		fetchTopTracks() // Get trending tracks
	}

	fetchArtist = (name: string) => {
		const { setArtist } = this.props

		setArtist(name) // Find and set target artist
	}

	render() {
		return <Home {...this.props} />
	}
}

const mapStateToProps = state => {
	return {
		topArtists: state.artists.topArtists,
		topTracks: state.artists.topTracks,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchTrending: () => dispatch(fetchTrending()),
		fetchTopTracks: () => dispatch(fetchTopTracks()),
		setArtist: name => dispatch(setArtist(name)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
