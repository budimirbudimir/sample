import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import { PrivateRoute, PublicRoute } from '../routes'

import FavoritesContainer from '../containers/FavoritesContainer'
import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'
import HeaderContainer from '../containers/HeaderContainer'
import HomeContainer from '../containers/HomeContainer'
import NavigatorContainer from '../containers/NavigatorContainer'
import PageNotFound from './404'

const AppRouter = ({ loading, authed }) => {

	// If loading, indicate it to user
	if (loading === true) return <h1>Loading</h1>

	return (
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
							component={NavigatorContainer}
						/>

						<PrivateRoute
							authed={authed}
							path="/favorites"
							component={FavoritesContainer}
						/>

						<Route render={() => <PageNotFound />} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	)
}

export default AppRouter
