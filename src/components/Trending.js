// @flow

import React from 'react'

import type { TopArtist } from '../models'
import '../styles/Footer.css'

type TrendingTypes = {
	// artists is array of objects containing artist data
	artists: TopArtist[],
	// fetchArtist is function to get artist data by artist name
	fetchArtist?: null | (string => void),
}

const Trending = ({ artists, fetchArtist }: TrendingTypes) => (
	<div>
		{artists.length > 0 && (
			<div className="App-trending">
				<p>Trending Artists:</p>

				<ul className="App-results">
					{artists.map((item, index) => (
						<li
							className="App-result"
							key={index}
							onClick={() => fetchArtist && fetchArtist(item.name)}
						>
							{item.name}
						</li>
					))}
				</ul>
			</div>
		)}
	</div>
)

export default Trending
