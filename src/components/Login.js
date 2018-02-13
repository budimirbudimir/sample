import React, { Component } from 'react'
import { login, resetPassword } from '../utils'

function setErrorMsg(error) {
	return {
		loginMessage: error,
	}
}

class Login extends Component {
	state = { loginMessage: null }

	handleSubmit = e => {
		e.preventDefault()
		login(this.email.value, this.pw.value).catch(error => {
			this.setState(setErrorMsg('Invalid username/password.'))
		})
	}

	resetPassword = () => {
		resetPassword(this.email.value)
			.then(() =>
				this.setState(
					setErrorMsg(`Password reset email sent to ${this.email.value}.`),
				),
			)
			.catch(error => this.setState(setErrorMsg('Email address not found.')))
	}

	render() {
		return (
			<div className="Login">
				<h1>Login</h1>

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

					{this.state.loginMessage && (
						<div>
							<p>{this.state.loginMessage}</p>
							<p>
								<a href="#" onClick={this.resetPassword}>
									Forgot Password?
								</a>
							</p>
						</div>
					)}

					<button type="submit">Login</button>
				</form>
			</div>
		)
	}
}

export default Login
