import React from 'react'
import { Link } from 'react-router-dom'

const buttonStyle = {
  textDecoration: 'none',
  fontWeight: '700',
  color: '#f4425c'
}
const errorColor = { color: '#f4425c' }

const PageNotFound = () => (
  <div className="PageNotFound">
    <h1 style={errorColor}>Error 404</h1>
    <h3>Requested page could not be found!</h3>
    <Link to="/" style={buttonStyle}>
      Go back to Home
    </Link>
  </div>
)

export default PageNotFound
