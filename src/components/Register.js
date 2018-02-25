// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { auth } from '../actions/user'
import '../styles/Auth.css'

type PropsFromState = {
	// registrationError is string containing error message for registration form
	registrationError?: string,
}

type PropsFromDispatch = {
	// auth is action to register new user via firebaseAuth, using email/password
	auth: (string, string) => void,
}

type Props = PropsFromState & PropsFromDispatch

class Register extends Component<Props, null> {
	email: ?HTMLInputElement
	pw: ?HTMLInputElement

	handleSubmit = e => {
		e.preventDefault()
		const { auth } = this.props

		if (this.email && this.pw) auth(this.email.value, this.pw.value)
	}

	render() {
		const { registrationError } = this.props

		return (
			<div className="Auth">
				{registrationError && (
					<p className="App-alert App-error">{registrationError}</p>
				)}

				<h3>Register</h3>

				<form onSubmit={this.handleSubmit}>
					<div className="Auth-email_container">
						<input ref={email => (this.email = email)} placeholder="Email" />
					</div>

					<div className="Auth-password_container">
						<input
							type="password"
							placeholder="Password"
							ref={pw => (this.pw = pw)}
						/>
					</div>

					{/* {this.state.registerError && <p>{this.state.registerError}</p>} */}

					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		registrationError: state.user.registrationError,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		auth: (email, pw) => dispatch(auth(email, pw)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
