// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { auth } from '../actions/user'
import '../styles/Auth.css'

import Register from '../components/Register'

type PropsFromState = {
	// registrationError is string containing error message for registration form
	registrationError?: string,
}

type PropsFromDispatch = {
	// auth is action to register new user via firebaseAuth, using email/password
	auth: (string, string) => void,
}

type Props = PropsFromState & PropsFromDispatch

class RegisterContainer extends Component<Props, null> {
	handleSubmit = (email, pw) => {
		const { auth } = this.props

		if (email && pw) auth(email, pw)
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
