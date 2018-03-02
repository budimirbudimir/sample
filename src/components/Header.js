// @flow

import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../images/lastfm_logo.png'

type Props = {
	// authed is boolean defining if user is authenticated and if user has
	// access to session-locked content/pages
	authed: boolean,
	// logout is action which logs out currently active user
	logout: () => void,
}

const Header = ({ authed, logout }: Props) => (
	<header className="App-header">
		<nav className="Menu-bar">
			<div className="Menu-bar_container">
				<Link to="/" className="Menu-bar_item">
					<h1 className="App-title">
						<img className="App-logo" src={logo} alt="" />
						Last.fm Navigator
					</h1>
				</Link>

				<ul className="Header-menu">
					<li>
						<Link to="/" className="Menu-bar_item">
							Home
						</Link>
					</li>
					{authed && (
						<li>
							<Link to="/navigator" className="Menu-bar_item">
								Navigator
							</Link>
						</li>
					)}
					{authed && (
						<li>
							<Link to="/favorites" className="Menu-bar_item">
								Favorites
							</Link>
						</li>
					)}
					<li>
						{authed ? (
							<button
								onClick={() => logout()}
								className="Menu-bar_item Header-menu_button"
							>
								Logout
							</button>
						) : (
							<span>
								<Link to="/login" className="Menu-bar_item">
									Login
								</Link>
								<Link to="/register" className="Menu-bar_item">
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

export default Header
