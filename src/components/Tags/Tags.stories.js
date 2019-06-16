import React from 'react'

import { storiesOf } from '@storybook/react'

import Tags from '.'
import '../styles/App.css'

const tagList = [
  { name: 'rock', url: 'https://www.last.fm/tag/rock' },
  { name: 'pop', url: 'https://www.last.fm/tag/pop' },
  { name: 'metal', url: 'https://www.last.fm/tag/metal' },
  { name: 'disco', url: 'https://www.last.fm/tag/disco' },
  { name: 'reggae', url: 'https://www.last.fm/tag/reggae' }
]

storiesOf('Tags', module).add('Default state', () => <Tags tags={tagList} />)
