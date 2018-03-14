// @flow

import React from 'react'

import starEmpty from '../../src/images/star_0.png'
import starFilled from '../images/star_1.png'

import type { Artist } from '../models'
import Similar from './Similar'
import Tags from './Tags'

type Props = {
	// target is object containing all relevant target artist' data
	target: Artist,
	// targetImage is string representing target artist image URL
	targetImage: string,
	// expanded points to current target artists bio state (show more/less)
	expanded: boolean,
	// favoriteError is string containing error message for favorite action
	favoriteError?: string,
	// isCurrentFavorite is boolean indicating if current artist have been added
	// to current user's favorites in DB
	isCurrentFavorite: boolean,
	// fetchArtist is function to get current artist data
	fetchArtist: string => void,
	// toggleBio is action for toggling current/target artist bio (show more/less)
	toggleBio: () => void,
	// handleAddFavorite is action to add current target artist (in detail view)
	// in current user's favorites in DB
	handleAddFavorite: string => void,
	// handleRemoveFavorite is action to remove current target artist
	// (in detail view) from current user's favorites in DB
	handleRemoveFavorite: string => void,
}

const ArtistPage = ({
	target,
	targetImage,
	expanded,
	favoriteError,
	isCurrentFavorite,
	toggleBio,
	fetchArtist,
	handleAddFavorite,
	handleRemoveFavorite,
}: Props) => (
	<div className="ArtistPage">
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

						{isCurrentFavorite ? (
							<img
								src={starFilled}
								alt=""
								className="App-fav_star"
								onClick={() => handleRemoveFavorite(target.mbid)}
							/>
						) : (
							<img
								src={starEmpty}
								alt=""
								className="App-fav_star"
								onClick={handleAddFavorite}
							/>
						)}
					</h2>

					{favoriteError && <p style={{ color: '#d8000c' }}>{favoriteError}</p>}

					<p>
						Listeners: <strong>{target.stats.listeners}</strong>
						<br />
						Total plays: <strong>{target.stats.playcount}</strong>
					</p>

					{expanded ? (
						<p className="App-bio_text">
							<span dangerouslySetInnerHTML={{ __html: target.bio.content }} />
							<br />
							<a className="App-bio_link" onClick={toggleBio}>
								View Less
							</a>
						</p>
					) : (
						<p className="App-bio_text">
							<span dangerouslySetInnerHTML={{ __html: target.bio.summary }} />
							<br />
							<a className="App-bio_link" onClick={toggleBio}>
								View More
							</a>
						</p>
					)}

					<Similar similar={target.similar.artist} fetchArtist={fetchArtist} />
					<Tags tags={target.tags.tag} />
				</div>
			</div>
		)}
	</div>
)

export default ArtistPage
