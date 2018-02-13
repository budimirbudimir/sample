// @flow

import React from 'react'

import type { Tag } from '../models'

type TagsTypes = {
	// tags is array of objects containing certain tag data
	tags: Tag[],
}

const Tags = ({ tags }: TagsTypes) => (
	<p>
		Tags:
		{tags.map((tag: Tag, index) => (
			<a key={index} className="App-similar_act" href={tag.url}>
				{tag.name}
			</a>
		))}
	</p>
)

export default Tags
