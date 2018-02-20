// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTrending, setArtist } from '../actions/artists'
import '../styles/Home.css'
import Trending from './Trending'

import type { TopArtist } from '../models'

type PropsFromState = {
	// topArtists is array containing all artists from Trending chart
	// with their relevant data
	topArtists: TopArtist[],
}

type PropsFromDispatch = {
	// fetchTrending is action for fetching all Trending chart artists
	// together with their relevant data
	fetchTrending: () => void,
	// setArtist is action for fetching artist by current search query
	setArtist: string => void,
}

type Props = PropsFromState & PropsFromDispatch

class Home extends Component<Props, null> {
	componentDidMount() {
		const { fetchTrending } = this.props

		fetchTrending() // Get trending artists
	}

	fetchArtist = (name: string) => {
		const { setArtist } = this.props

		setArtist(name) // Find and set target artist
	}

	render() {
		const { topArtists } = this.props

		return (
			<div className="Home">
				<div className="Home-inner">
					<h3>Public Home page.</h3>
					<p>
						Show some content, such as most popular and latest songs/albums
						charts.
					</p>
				</div>

				<Trending artists={topArtists} fetchArtist={null} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		topArtists: state.artists.topArtists,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchTrending: () => dispatch(fetchTrending()),
		setArtist: name => dispatch(setArtist(name)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
