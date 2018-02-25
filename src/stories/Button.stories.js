import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button } from '@storybook/react/demo'

// TODO: Remove eventually

storiesOf('Button', module)
	.add('With text', () => (
		<Button onClick={action('clicked')}>Hello Button</Button>
	))
	.add('With emoji', () => (
		<Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
	))
