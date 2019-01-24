import React from 'react'

const Similar = ({ similar, fetchArtist }) => (
	<p>
		<span className="Similar-title">Similar acts:</span>
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
