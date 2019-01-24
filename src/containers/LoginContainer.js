import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { login, setLoginError, resetPassword } from '../actions'
import { validate } from '../utils'
import Login from '../components/Login'
import '../styles/Auth.css'


//#region LOGIN ACTIONS
const withLoginActions = withHandlers({
	submit: ({ login, setLoginError }) => (email, pw) => {
		const validated = validate(email, pw)

		if (validated.valid) {
			login(email, pw)
		} else {
			setLoginError(validated.error)
		}
	},
	reset: ({ resetPassword }) => email => {
		if (email) resetPassword(email)
	}
})
//#endregion


//#region REDUX CONNECTION
const mapStateToProps = state => ({
	loginError: state.user.loginError,
})
const mapDispatchToProps = dispatch => ({
	login: (email, pw) => dispatch(login(email, pw)),
	setLoginError: error => dispatch(setLoginError(error)),
	resetPassword: email => dispatch(resetPassword(email)),
})
const withReduxConnection = connect(mapStateToProps, mapDispatchToProps)
//#endregion


export default compose(
	withReduxConnection,
	withLoginActions,
)(Login)
