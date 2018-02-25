function loadStories() {
	require('../src/stories/Welcome.stories.js')
	require('../src/stories/Button.stories.js')
	require('../src/stories/Tags.stories.js')
	require('../src/stories/404.stories.js')
}

const stories = [
	'../src/stories/Button.stories.js',
	'../src/stories/Welcome.stories.js',
	'../src/stories/Tags.stories.js',
	'../src/stories/404.stories.js',
]

module.exports = {
	loadStories,
	stories,
}
