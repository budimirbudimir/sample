// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { logout } from '../actions/user'
import '../styles/Header.css'

import Header from '../components/Header'

type PropsFromState = {
	// authed is boolean defining if user is authenticated and if user has
	// access to session-locked content/pages
	authed: boolean,
}

type PropsFromDispatch = {
	// logout is action which logs out currently active user
	logout: () => void,
}

type Props = PropsFromState & PropsFromDispatch

class HeaderContainer extends Component<Props, null> {
	render() {
		return <Header {...this.props} />
	}
}

const mapDispatchToProps = dispatch => {
	return {
		logout: () => dispatch(logout()),
	}
}

export default connect(null, mapDispatchToProps)(HeaderContainer)
