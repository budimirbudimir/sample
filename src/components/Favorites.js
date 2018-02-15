// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTrending, getFavorites, removeFavorite } from '../actions'
import '../styles/Favorites.css'
import Trending from './Trending'

import type { TopArtist, Artist } from '../models'

type PropsFromState = {
	// target is object containing all relevant target artist' data
	target: Artist,
	// topArtists is array containing all artists from Trending chart
	// with their relevant data
	topArtists: TopArtist[],
}

type PropsFromDispatch = {
	// fetchTrending is action for fetching all Trending chart artists
	// together with their relevant data
	fetchTrending: () => void,
	//
	getFavorites: string => void,
	//
	removeFavorite: (string, Artist) => void,
}

type Props = PropsFromState & PropsFromDispatch

class Favorites extends Component<Props, null> {
	componentDidMount() {
		const { fetchTrending, getFavorites } = this.props
		const userID = localStorage.getItem('currentUser')

		// Get trending artists
		fetchTrending()

		// Get favorite artists by user
		if (userID) getFavorites(userID)
	}

	handleRemoveFavorite = e => {
		e.preventDefault()
		const { removeFavorite, target } = this.props
		const userID = localStorage.getItem('currentUser')

		console.log(userID, target.mbid)

		// Get favorite artists by user
		if (userID) removeFavorite(userID, target.mbid)
	}

	render() {
		const { topArtists, authedUserFavs } = this.props

		return (
			<div
				className="Favorites"
				style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
			>
				<div style={{ flex: 6, padding: '30px 0' }}>
					<h3>Your favorite artists</h3>

					{authedUserFavs && (
						<div className="Favorites-list">
							{authedUserFavs.map((item, index) => (
								<div className="Favorites-item" key={index}>
									<img src={item.image} alt={item.name} />
									<p>{item.name}</p>
									<a onClick={this.handleRemoveFavorite}>x</a>
								</div>
							))}
						</div>
					)}
				</div>

				<Trending artists={topArtists} fetchArtist={() => null} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		target: state.artists.target,
		topArtists: state.artists.topArtists,
		authedUserFavs: state.user.authedUserFavs,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchTrending: () => dispatch(fetchTrending()),
		getFavorites: userID => dispatch(getFavorites(userID)),
		removeFavorite: (userID, artistID) =>
			dispatch(removeFavorite(userID, artistID)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
