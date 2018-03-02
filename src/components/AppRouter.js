// @flow

import React, { Component } from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import { firebaseAuth } from '../config'
import { PrivateRoute, PublicRoute } from '../routes'

import FavoritesContainer from '../containers/FavoritesContainer'
import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'
import HeaderContainer from '../containers/HeaderContainer'
import HomeContainer from '../containers/HomeContainer'
import Navigator from './Navigator'
import PageNotFound from './404'

type OwnState = {
	// authed is boolean indicating if user is logged in
	authed: boolean,
	// loading is boolean indicating if logging process is currently ongoing
	loading: boolean,
}

class AppRouter extends Component<null, OwnState> {
	removeListener: () => void

	state = {
		authed: false,
		loading: true,
	}

	componentDidMount() {
		this.removeListener = firebaseAuth().onAuthStateChanged(user => {
			this.setState({ authed: !!user, loading: false })
		})
	}

	componentWillUnmount() {
		this.removeListener()
	}

	render() {
		const { loading, authed } = this.state

		return loading === true ? (
			<h1>Loading</h1>
		) : (
			<BrowserRouter>
				<div className="App">
					<HeaderContainer authed={authed} />

					<div className="App-route_container">
						<Switch>
							<Route path="/" exact component={HomeContainer} />

							<PublicRoute
								authed={authed}
								path="/login"
								component={LoginContainer}
							/>

							<PublicRoute
								authed={authed}
								path="/register"
								component={RegisterContainer}
							/>

							<PrivateRoute
								authed={authed}
								path="/navigator"
								component={Navigator}
							/>

							<PrivateRoute
								authed={authed}
								path="/favorites"
								component={FavoritesContainer}
							/>

							{/* If no mathching route found: */}
							<Route render={() => <PageNotFound />} />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

export default AppRouter
