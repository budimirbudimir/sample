// @flow

import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import { firebaseAuth } from '../config'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Favorites from './Favorites'
import App from './App'

type RouteProps = {
	// component is React component to be parsed in the route
	component: Component,
	// authed is boolean defining if user is authenticated and if user has
	// access to session-locked content/pages
	authed: boolean,
	// TODO: Check and fill
	// location?: string,

	// May contain more props as per rest operator
}

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

const PublicRoute = ({ component: Component, authed, ...rest }: RouteProps) => (
	<Route
		{...rest}
		render={props =>
			authed === false ? <Component {...props} /> : <Redirect to="/navigator" />
		}
	/>
)

class AppContainer extends Component {
	state = {
		authed: false,
		loading: true,
	}

	componentDidMount() {
		this.removeListener = firebaseAuth().onAuthStateChanged(user => {
			if (user) {
				this.setState({
					authed: true,
					loading: false,
				})
			} else {
				this.setState({
					authed: false,
					loading: false,
				})
			}
		})
	}

	componentWillUnmount() {
		this.removeListener()
	}

	render() {
		return this.state.loading === true ? (
			<h1>Loading</h1>
		) : (
			<BrowserRouter>
				<div className="App">
					<Header authed={this.state.authed} />

					<div style={{ flex: 6 }}>
						<Switch>
							<Route path="/" exact component={Home} />

							<PublicRoute
								authed={this.state.authed}
								path="/login"
								component={Login}
							/>

							<PublicRoute
								authed={this.state.authed}
								path="/register"
								component={Register}
							/>

							<PrivateRoute
								authed={this.state.authed}
								path="/navigator"
								component={App}
							/>

							<PrivateRoute
								authed={this.state.authed}
								path="/favorites"
								component={Favorites}
							/>

							<Route render={() => <h3>No Match</h3>} />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}

export default AppContainer
