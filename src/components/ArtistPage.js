// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import starEmpty from '../../src/images/star_0.png'
import starFilled from '../images/star_1.png'

import { addFavorite, removeFavorite, getFavorites } from '../actions/user'
import type { Artist, TopArtist, FavoriteArtist } from '../models'
import Similar from './Similar'
import Tags from './Tags'

type PropsFromState = {
	// target is object containing all relevant target artist' data
	target: Artist,
	// targetImage is string representing target artist image URL
	targetImage: string,
	// expanded points to current target artists bio state (show more/less)
	expanded: boolean,
	// authedUserFavs is array indicating which artists current user favorited
	authedUserFavs: FavoriteArtist[],
	// query is current search query string entered in the input field
	query: string,
	// showDropdown is boolean indicating if search dropdown is visible
	showDropdown: boolean,
	// results is array containing current search query results
	results: TopArtist[],
}

type PropsFromDispatch = {
	fetchArtist: string => void,
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

type Props = PropsFromState & PropsFromDispatch

type OwnState = {
	// isCurrentFavorite is boolean indicating if current artist have been added
	// to current user's favorites in DB
	isCurrentFavorite: boolean,
}

class ArtistPage extends Component<Props, OwnState> {
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
		const {
			target,
			targetImage,
			toggleBio,
			fetchArtist,
			expanded,
			query,
			showDropdown,
			results,
		} = this.props

		return (
			<div className="ArtistPage">
				{showDropdown &&
					query !== '' &&
					query.length > 2 && (
						<ul className="Search-results">
							{results &&
								results.map((value, index) => (
									<li
										key={index}
										className="Search-result"
										onClick={() => fetchArtist(value.name)}
									>
										<img src={value.image['0']['#text']} alt="" />
										{value.name}
									</li>
								))}
						</ul>
					)}

				{target.name !== '' && (
					<div className="App-info">
						<div className="App-info_details">
							<img src={targetImage} alt="" />
						</div>

						<div className="App-info_bio">
							<h2>
								<a
									className="App-bio_title"
									href={target.bio.links.link.href}
									target="blank"
									rel="noreferrer noopener"
								>
									{target.name}
								</a>

								{this.state.isCurrentFavorite ? (
									<img
										src={starFilled}
										alt=""
										className="App-fav_star"
										onClick={() => this.handleRemoveFavorite(target.mbid)}
									/>
								) : (
									<img
										src={starEmpty}
										alt=""
										className="App-fav_star"
										onClick={this.handleAddFavorite}
									/>
								)}
							</h2>

							<p>
								Listeners: <strong>{target.stats.listeners}</strong>
								<br />
								Total plays: <strong>{target.stats.playcount}</strong>
							</p>

							{expanded ? (
								<p className="App-bio_text">
									<span
										dangerouslySetInnerHTML={{ __html: target.bio.content }}
									/>
									<br />
									<a className="App-bio_link" onClick={toggleBio}>
										View Less
									</a>
								</p>
							) : (
								<p className="App-bio_text">
									<span
										dangerouslySetInnerHTML={{ __html: target.bio.summary }}
									/>
									<br />
									<a className="App-bio_link" onClick={toggleBio}>
										View More
									</a>
								</p>
							)}

							<Similar
								similar={target.similar.artist}
								fetchArtist={fetchArtist}
							/>
							<Tags tags={target.tags.tag} />
						</div>
					</div>
				)}
			</div>
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
		addFavorite: (userID, artist) => dispatch(addFavorite(userID, artist)),
		removeFavorite: (userID, artistID) =>
			dispatch(removeFavorite(userID, artistID)),
		getFavorites: userID => dispatch(getFavorites(userID)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage)
