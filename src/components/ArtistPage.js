// @flow

import React from 'react'

import starEmpty from '../images/star_0.png'
import starFilled from '../images/star_1.png'

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
}

type Props = PropsFromState & PropsFromDispatch

const ArtistPage = ({
	target,
	targetImage,
	toggleBio,
	fetchArtist,
	expanded,
	addFavorite,
	removeFavorite,
	authedUserFavs,
	query,
	showDropdown,
	results,
}: Props) => {
	const handleAddFavorite = () => {
		const userID = localStorage.getItem('currentUser')

		if (userID) addFavorite(userID, target)
	}

	const handleRemoveFavorite = () => {
		const userID = localStorage.getItem('currentUser')

		if (userID) removeFavorite(userID, target.mbid)
	}

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

							{authedUserFavs &&
								authedUserFavs.map(fav => {
									// FIXME: Fix this mess to show only one button
									if (fav.id === target.mbid)
										return (
											<img
												key={fav.id}
												src={starFilled}
												alt="Remove as favorite"
												style={{
													maxWidth: 24,
													cursor: 'pointer',
													padding: '0 0 5px 5px',
												}}
												onClick={handleRemoveFavorite}
											/>
										)
									return false
								})}
							<img
								src={starEmpty}
								alt="Add as favorite"
								style={{
									maxWidth: 24,
									cursor: 'pointer',
									padding: '0 0 5px 5px',
								}}
								onClick={handleAddFavorite}
							/>
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

export default ArtistPage
