import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import App from './App'
import { logout } from '../utils'
import { firebaseAuth } from '../config'

function PrivateRoute({ component: Component, authed, ...rest }) {
	return (
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
}

function PublicRoute({ component: Component, authed, ...rest }) {
	return (
		<Route
			{...rest}
			render={props =>
				authed === false ? (
					<Component {...props} />
				) : (
					<Redirect to="/dashboard" />
				)
			}
		/>
	)
}

export default class AppContainer extends Component {
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

					<div>
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
								path="/dashboard"
								component={App}
							/>
							<Route render={() => <h3>No Match</h3>} />
						</Switch>
					</div>
				</div>
			</BrowserRouter>
		)
	}
}
