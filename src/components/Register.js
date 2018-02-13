import React, { Component } from 'react'
import { auth } from '../utils'

function setErrorMsg(error) {
	return {
		registerError: error.message,
	}
}

export default class Register extends Component {
	state = { registerError: null }
	handleSubmit = e => {
		e.preventDefault()
		auth(this.email.value, this.pw.value).catch(e =>
			this.setState(setErrorMsg(e)),
		)
	}
	render() {
		return (
			<div className="Register">
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="Register-email_container">
						<input ref={email => (this.email = email)} placeholder="Email" />
					</div>
					<div className="Register-password_container">
						<input
							type="password"
							placeholder="Password"
							ref={pw => (this.pw = pw)}
						/>
					</div>
					{this.state.registerError && <p>{this.state.registerError}</p>}
					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
}
