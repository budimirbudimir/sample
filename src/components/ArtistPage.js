import React from 'react'

import starEmpty from '../images/star_0.png'
import starFilled from '../images/star_1.png'

import type { Artist } from '../models'
import Similar from './Similar'
import Tags from './Tags'

type ArtistProps = {
	target: Artist,
	targetImage: string,
	toggleBio: () => void,
	fetchArtist: string => void,
	expanded: boolean,
}

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
}: ArtistProps) => {
	const handleAddFavorite = () => {
		const authedUserID = localStorage.getItem('currentUser')

		if (authedUserID) addFavorite(authedUserID, target)
	}

	const handleRemoveFavorite = () => {
		const authedUserID = localStorage.getItem('currentUser')

		if (authedUserID) removeFavorite(authedUserID, target)
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
							Listeners: {target.stats.listeners} / Total plays:{' '}
							{target.stats.playcount}
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
