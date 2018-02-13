// @flow

import React from 'react'

import type { SimilarArtist } from '../models'

type SimilarTypes = {
	// similar is array of objects containing similar artist data
	similar: SimilarArtist[],
	// fetchArtist is function to get artist data by artist name
	fetchArtist: string => void,
}

const Similar = ({ similar, fetchArtist }: SimilarTypes) => (
	<p>
		Similar acts:
		{similar.map((act, index) => (
			<span
				key={index}
				className="App-similar_act"
				href={act.url}
				onClick={() => fetchArtist(act.name)}
			>
				{act.name}
			</span>
		))}
	</p>
)

export default Similar
