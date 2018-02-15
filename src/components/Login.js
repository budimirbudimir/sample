// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login, resetPassword } from '../actions'
import '../styles/Login.css'

type PropsFromDispatch = {
	// login is action to log user in, by using entered email and password
	login: string => void,
	// resetPassword is action to reset user's password by using stored email
	resetPassword: string => void,
}

type Props = PropsFromDispatch

class Login extends Component<Props, null> {
	handleSubmit = e => {
		e.preventDefault()
		const { login } = this.props

		login(this.email.value, this.pw.value)
	}

	handleResetPassword = e => {
		e.preventDefault()
		const { resetPassword } = this.props

		resetPassword(this.email.value)
	}

	render() {
		return (
			<div className="Login">
				<h3>Login</h3>

				<form onSubmit={this.handleSubmit}>
					<div className="Login-email_container">
						<input ref={email => (this.email = email)} placeholder="Email" />
					</div>

					<div className="Login-password_container">
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
