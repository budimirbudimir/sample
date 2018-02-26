// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getFavorites, removeFavorite } from '../actions/user'
import '../styles/Favorites.css'

import type { Artist, FavoriteArtist } from '../models'

import Favorites from '../components/Favorites'

type PropsFromState = {
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

class FavoritesContainer extends Component<Props, null> {
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
		return (
			<Favorites
				{...this.props}
				handleRemoveFavorite={this.handleRemoveFavorite}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
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

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer)
