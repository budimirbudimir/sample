// @flow

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import logo from '../images/lastfm_logo.png'

import { logout } from '../actions'
// import { logout } from '../utils'

class Header extends Component {
	render() {
		const { authed } = this.props

		return (
			<header className="App-header">
				<nav className="navbar navbar-default navbar-static-top">
					<div className="container">
						<div className="navbar-header">
							<Link to="/" className="navbar-brand">
								<h1 className="App-title">
									<img className="App-logo" src={logo} alt="" />
									Last.fm Navigator
								</h1>
							</Link>
						</div>
						<ul className="Header-menu nav navbar-nav pull-right">
							<li>
								<Link to="/" className="navbar-brand">
									Home
								</Link>
							</li>
							<li>
								<Link to="/dashboard" className="navbar-brand">
									Dashboard
								</Link>
							</li>
							<li>
								<Link to="/favorites" className="navbar-brand">
									Favorites
								</Link>
							</li>
							<li>
								{authed ? (
									<button
										style={{ border: 'none', background: 'transparent' }}
										onClick={() => {
											this.props.logout()
										}}
										className="navbar-brand"
									>
										Logout
									</button>
								) : (
									<span>
										<Link to="/login" className="navbar-brand">
											Login
										</Link>
										<Link to="/register" className="navbar-brand">
											Register
										</Link>
									</span>
								)}
							</li>
						</ul>
					</div>
				</nav>
			</header>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout()),
	}
}

export default connect(null, mapDispatchToProps)(Header)
