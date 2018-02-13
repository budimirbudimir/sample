import React from 'react'

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
}: ArtistProps) => (
	<div className="ArtistPage">
		{/* Render currently active artist */}

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

					<Similar similar={target.similar.artist} fetchArtist={fetchArtist} />
					<Tags tags={target.tags.tag} />
				</div>
			</div>
		)}
	</div>
)

export default ArtistPage
