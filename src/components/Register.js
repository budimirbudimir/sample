import React, { Component } from 'react'
import { connect } from 'react-redux'

import { auth } from '../actions'
import '../styles/Register.css'

class Register extends Component {
	handleSubmit = e => {
		e.preventDefault()
		const { auth } = this.props

		auth(this.email.value, this.pw.value)
	}

	render() {
		return (
			<div className="Register">
				<h3>Register</h3>

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

					{/* {this.state.registerError && <p>{this.state.registerError}</p>} */}

					<button type="submit">Register</button>
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		auth: (email, pw) => dispatch(auth(email, pw)),
	}
}

export default connect(null, mapDispatchToProps)(Register)
