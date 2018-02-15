// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTrending, setArtist } from '../actions'
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

class Favorites extends Component<Props, null> {
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
			<div
				className="Home"
				style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
			>
				<div style={{ flex: 6 }}>
					<h3>Private Favorites page.</h3>
					<p>Show list of favorited artists for currently logged in user.</p>
				</div>

				<Trending artists={topArtists} fetchArtist={this.fetchArtist} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		topArtists: state.navigator.topArtists,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchTrending: () => dispatch(fetchTrending()),
		setArtist: name => dispatch(setArtist(name)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
