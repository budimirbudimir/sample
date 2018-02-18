// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import starEmpty from '../images/star_0.png'
import starFilled from '../images/star_1.png'

import { addFavorite, removeFavorite, getFavorites } from '../actions'
import type { Artist, TopArtist } from '../models'
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
	authedUserFavs: Array<any>,
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
	//
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
		const currentFavs = nextProps.authedUserFavs.map(fav => fav.id)
		const isCurrentFavorite = currentFavs.indexOf(nextProps.target.mbid) !== -1

		this.setState({ isCurrentFavorite })
	}

	handleAddFavorite = () => {
		const { target, addFavorite } = this.props
		const userID = localStorage.getItem('currentUser')

		if (userID) addFavorite(userID, target)
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
				{/* Render currently active artist */}

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
										alt="Remove as favorite"
										style={{
											maxWidth: 24,
											cursor: 'pointer',
											padding: '0 0 5px 5px',
										}}
										onClick={() => this.handleRemoveFavorite(target.mbid)}
									/>
								) : (
									<img
										src={starEmpty}
										alt="Add as favorite"
										style={{
											maxWidth: 24,
											cursor: 'pointer',
											padding: '0 0 5px 5px',
										}}
										onClick={this.handleAddFavorite}
									/>
								)}
							</h2>

							<p>
								Listeners: <strong>{target.stats.listeners}</strong> / Total
								plays: <strong>{target.stats.playcount}</strong>
							</p>

							{expanded ? (
								<p>
									{target.bio.content} <br />
									<a className="App-bio_link" onClick={toggleBio}>
										View Less
									</a>
								</p>
							) : (
								<p>
									{target.bio.summary} <br />
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
