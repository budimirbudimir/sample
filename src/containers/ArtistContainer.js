// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleBio } from '../actions/artists'
import { addFavorite, removeFavorite, getFavorites } from '../actions/user'
import type { Artist, TopArtist, FavoriteArtist } from '../models'

import ArtistPage from '../components/Artist'

type OwnProps = {
	// fetchArtist is function to get current artist data
	fetchArtist: string => void,
	// query is current search query string entered in the input field
	query: string,
	// showDropdown is boolean indicating if search dropdown is visible
	showDropdown: boolean,
}

type PropsFromState = {
	// target is object containing all relevant target artist' data
	target: Artist,
	// targetImage is string representing target artist image URL
	targetImage: string,
	// expanded points to current target artists bio state (show more/less)
	expanded: boolean,
	// results is array containing current search query results
	results: TopArtist[],
	// favoriteError is string containing error message for favorite action
	favoriteError?: string,
	// authedUserFavs is array indicating which artists current user favorited
	authedUserFavs: FavoriteArtist[],
}

type PropsFromDispatch = {
	// toggleBio is action for toggling current/target artist bio (show more/less)
	toggleBio: () => void,
	// addFavorite is action to add current target artist (in detail view)
	// in current user's favorites in DB
	addFavorite: (string, Artist) => void,
	// removeFavorite is action to remove current target artist (in detail view)
	// from current user's favorites in DB
	removeFavorite: (string, Artist) => void,
	// getFavorites is action to fetch current user's favorites from DB
	getFavorites: string => void,
}

type Props = OwnProps & PropsFromState & PropsFromDispatch

type OwnState = {
	// isCurrentFavorite is boolean indicating if current artist have been added
	// to current user's favorites in DB
	isCurrentFavorite: boolean,
}

class ArtistContainer extends Component<Props, OwnState> {
	state = {
		isCurrentFavorite: false,
	}

	componentDidMount() {
		const { getFavorites } = this.props
		const userID = localStorage.getItem('currentUser')

		// Get favorite artists by user
		if (userID) getFavorites(userID)
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.authedUserFavs) return false
		const currentFavs = nextProps.authedUserFavs.map(fav => fav.id)
		const isCurrentFavorite = currentFavs.indexOf(nextProps.target.mbid) !== -1

		this.setState({ isCurrentFavorite })
	}

	handleAddFavorite = () => {
		const { target, addFavorite, authedUserFavs, getFavorites } = this.props
		const userID = localStorage.getItem('currentUser')

		if (userID)
			// $FlowFixMe
			addFavorite(userID, target).then(() => {
				// If user had no favorites prior to adding this,
				// pull new list when done with adding
				if (!authedUserFavs) getFavorites(userID)
			})
	}

	handleRemoveFavorite = (artistID: string) => {
		const { removeFavorite } = this.props
		const userID = localStorage.getItem('currentUser')

		if (userID) removeFavorite(userID, artistID)
	}

	render() {
		const { isCurrentFavorite } = this.state

		return (
			<ArtistPage
				{...this.props}
				isCurrentFavorite={isCurrentFavorite}
				handleAddFavorite={this.handleAddFavorite}
				handleRemoveFavorite={this.handleRemoveFavorite}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		target: state.artists.target,
		targetImage: state.artists.targetImage,
		expanded: state.artists.expanded,
		favoriteError: state.user.favoriteError,
		authedUserFavs: state.user.authedUserFavs,
		results: state.artists.results,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addFavorite: (userID, artist) => dispatch(addFavorite(userID, artist)),
		removeFavorite: (userID, artistID) =>
			dispatch(removeFavorite(userID, artistID)),
		getFavorites: userID => dispatch(getFavorites(userID)),
		toggleBio: () => dispatch(toggleBio()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistContainer)
