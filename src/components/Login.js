import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { login, resetPassword } from '../utils'
import { login, resetPassword } from '../actions'

class Login extends Component {
	handleSubmit = e => {
		e.preventDefault()
		const { login } = this.props

		login(this.email.value, this.pw.value)
	}

	resetPassword = () => {
		const { resetPassword } = this.props

		resetPassword(this.email.value)
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

					{/* {this.state.loginMessage && ( */}
					{/* <div> */}
					{/* <p>{this.state.loginMessage}</p> */}
					<p>
						<a onClick={this.resetPassword}>Forgot Password?</a>
					</p>
					{/* </div> */}
					{/* )} */}

					<button type="submit">Login</button>
				</form>
			</div>
		)
	}
}

// export default Login

const mapDispatchToProps = dispatch => {
	return {
		login: (email, pw) => dispatch(login(email, pw)),
		resetPassword: email => dispatch(resetPassword(email)),
	}
}

export default connect(null, mapDispatchToProps)(Login)
