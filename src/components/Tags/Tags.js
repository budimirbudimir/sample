import React from 'react'

const Tags = ({ tags }) => (
	<p>
		<span className="Tags-title">Tags:</span>
		{tags.map((tag, index) => (
			<a key={index} className="App-similar_act" href={tag.url}>
				{tag.name}
			</a>
		))}
	</p>
)

export default Tags
