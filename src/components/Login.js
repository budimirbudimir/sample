import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login, resetPassword } from '../actions'
import '../styles/Login.css'

class Login extends Component {
	handleSubmit = e => {
		e.preventDefault()
		const { login } = this.props

		login(this.email.value, this.pw.value)
	}

	handleResetPassword = e => {
		e.preventDefault
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
