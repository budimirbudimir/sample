import React from 'react'

import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'

import { Welcome } from '@storybook/react/demo'

// TODO: Remove eventually

storiesOf('Welcome', module).add('Default state', () => (
	<Welcome showApp={linkTo('Button')} />
))
