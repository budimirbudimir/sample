// Determine which store to use, development or production one
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./store.prod')
} else {
	module.exports = require('./store.dev')
}
