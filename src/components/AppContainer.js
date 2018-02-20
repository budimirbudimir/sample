// @flow

import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'

import { firebaseAuth } from '../config'
import type { RouteProps } from '../models'

import Header from './Header'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Favorites from './Favorites'
import App from './App'
import PageNotFound from './404'

// Define private route logic (inheritance and redirection)
const PrivateRoute = ({
	component: Component,
	authed,
	...rest
}: RouteProps) => (
	<Route
		{...rest}
		render={props =>
			authed === true ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{ pathname: '/login', state: { from: props.location } }}
				/>
			)
		}
	/>
)

// Define public route (inheritance)
const PublicRoute = ({ component: Component, authed, ...rest }: RouteProps) => (
	<Route
		{...rest}
		render={props =>
			authed === false ? <Component {...props} /> : <Redirect to="/navigator" />
		}
	/>
)

type OwnState = {
	// authed is boolean indicating if user is logged in
	authed: boolean,
	// loading is boolean indicating if logging process is currently ongoing
	loading: boolean,
}

class AppContainer extends Component<null, OwnState> {
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
					<Header authed={authed} />

					<div className="App-route_container">
						<Switch>
							<Route path="/" exact component={Home} />

							<PublicRoute authed={authed} path="/login" component={Login} />

							<PublicRoute
								authed={authed}
								path="/register"
								component={Register}
							/>

							<PrivateRoute authed={authed} path="/navigator" component={App} />

							<PrivateRoute
								authed={authed}
								path="/favorites"
								component={Favorites}
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

export default AppContainer
