const prod = './store.prod'
const dev = './store.dev'

// Determine which store to use, development or production one
const store = process.env.NODE_ENV === 'production' ? prod : dev

module.exports = require(`${store}`)
