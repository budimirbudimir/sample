// @flow

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import logo from '../images/lastfm_logo.png'

import { logout } from '../actions/user'
import '../styles/Header.css'

type PropsFromState = {
	// authed is boolean defining if user is authenticated and if user has
	// access to session-locked content/pages
	authed: boolean,
}

type PropsFromDispatch = {
	// logout is action which logs out currently active user
	logout: () => void,
}

type Props = PropsFromState & PropsFromDispatch

class Header extends Component<Props, null> {
	render() {
		const { authed, logout }: Props = this.props

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
							{authed && (
								<li>
									<Link to="/navigator" className="navbar-brand">
										Navigator
									</Link>
								</li>
							)}
							{authed && (
								<li>
									<Link to="/favorites" className="navbar-brand">
										Favorites
									</Link>
								</li>
							)}
							<li>
								{authed ? (
									<button
										style={{ border: 'none', background: 'transparent' }}
										onClick={() => {
											logout()
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
