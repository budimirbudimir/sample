// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { login, resetPassword } from '../actions/user'
import '../styles/Auth.css'

import Login from '../components/Login'

type PropsFromState = {
	// loginError is string containing error message for login form
	loginError?: string,
}

type PropsFromDispatch = {
	// login is action to log user in, by using entered email and password
	login: (string, string) => void,
	// resetPassword is action to reset user's password by using stored email
	resetPassword: string => void,
}

type Props = PropsFromState & PropsFromDispatch

class LoginContainer extends Component<Props, null> {
	handleSubmit = (email, pw) => {
		const { login } = this.props

		if (email && pw) login(email, pw)
	}

	handleResetPassword = email => {
		const { resetPassword } = this.props

		if (email) resetPassword(email)
	}

	render() {
		const { loginError } = this.props

		return (
			<Login
				loginError={loginError}
				submit={this.handleSubmit}
				reset={this.handleResetPassword}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		loginError: state.user.loginError,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: (email, pw) => dispatch(login(email, pw)),
		resetPassword: email => dispatch(resetPassword(email)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)