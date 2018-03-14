// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { auth, setRegisterError } from '../actions/user'
import { validate } from '../utils'
import '../styles/Auth.css'

import Register from '../components/Register'

type PropsFromState = {
	// registrationError is string containing error message for registration form
	registrationError?: string,
}

type PropsFromDispatch = {
	// auth is action to register new user via firebaseAuth, using email/password
	auth: (string, string) => void,
	// setRegisterError is action to return current input errors on register form to user
	setRegisterError: string => void,
}

type Props = PropsFromState & PropsFromDispatch

class RegisterContainer extends Component<Props, null> {
	handleSubmit = (email, pw) => {
		const { auth, setRegisterError } = this.props
		const validated = validate(email, pw)

		if (validated.valid) {
			auth(email, pw)
		} else {
			setRegisterError(validated.error)
		}
	}

	render() {
		const { registrationError } = this.props

		return (
			<Register regError={registrationError} register={this.handleSubmit} />
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
		setRegisterError: error => dispatch(setRegisterError(error)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
