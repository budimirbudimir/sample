// @flow

import React from 'react'

type TagsTypes = {
  // tags is array of objects containing certain tag data
  tags: Array<*>,
}

const Tags = ({ tags }: TagsTypes) => (
  <p>
    Tags:
    {
      tags.map((tag, index) => (
        <a key={index} className='App-similar_act' href={tag.url}>
          { tag.name }
        </a>
      ))
    }
  </p>
)

export default Tags
