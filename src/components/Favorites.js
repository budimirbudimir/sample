// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getFavorites, removeFavorite } from '../actions/user'
import '../styles/Favorites.css'

import type { Artist, FavoriteArtist } from '../models'

type PropsFromState = {
	// target is object containing all relevant target artist' data
	target: Artist,
	// authedUserFavs is array indicating which artists current user favorited
	authedUserFavs: FavoriteArtist[],
}

type PropsFromDispatch = {
	// getFavorites is action to fetch current user's favorites from DB
	getFavorites: string => void,
	// removeFavorite is action to remove current target artist (in detail view)
	// from current user's favorites in DB
	removeFavorite: (string, Artist) => void,
}

type Props = PropsFromState & PropsFromDispatch

class Favorites extends Component<Props, null> {
	componentDidMount() {
		const { getFavorites } = this.props
		const userID = localStorage.getItem('currentUser')

		// Get favorite artists by user
		if (userID) getFavorites(userID)
	}

	handleRemoveFavorite = (artistID: string) => {
		const { removeFavorite } = this.props
		const userID = localStorage.getItem('currentUser')

		// Get favorite artists by user
		if (userID) removeFavorite(userID, artistID)
	}

	render() {
		const { authedUserFavs } = this.props

		return (
			<div className="Favorites">
				<div className="Favorites-inner">
					<h3>Your favorite artists</h3>

					{authedUserFavs && (
						<div className="Favorites-list">
							{authedUserFavs.map((item, index) => (
								<div className="Favorites-item" key={index}>
									<img src={item.image} alt={item.name} />
									<p>{item.name}</p>
									<a onClick={() => this.handleRemoveFavorite(item.id)}>x</a>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		target: state.artists.target,
		authedUserFavs: state.user.authedUserFavs,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getFavorites: userID => dispatch(getFavorites(userID)),
		removeFavorite: (userID, artistID) =>
			dispatch(removeFavorite(userID, artistID)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
