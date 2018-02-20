// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login, resetPassword } from '../actions/user'
import '../styles/Auth.css'

type PropsFromDispatch = {
	// login is action to log user in, by using entered email and password
	login: (string, string) => void,
	// resetPassword is action to reset user's password by using stored email
	resetPassword: string => void,
}

type Props = PropsFromDispatch

class Login extends Component<Props, null> {
	email: ?HTMLInputElement
	pw: ?HTMLInputElement

	handleSubmit = e => {
		e.preventDefault()
		const { login } = this.props

		if (this.email && this.pw) login(this.email.value, this.pw.value)
	}

	handleResetPassword = e => {
		e.preventDefault()
		const { resetPassword } = this.props

		if (this.email) resetPassword(this.email.value)
	}

	render() {
		return (
			<div className="Auth">
				<h3>Login</h3>

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

					<p>
						<a className="resetPassword" onClick={this.handleResetPassword}>
							Forgot Password?
						</a>
					</p>

					<button type="submit">Login</button>
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: (email, pw) => dispatch(login(email, pw)),
		resetPassword: email => dispatch(resetPassword(email)),
	}
}

export default connect(null, mapDispatchToProps)(Login)
