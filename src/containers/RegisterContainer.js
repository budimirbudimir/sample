import { connect } from 'react-redux'
import { compose, withHandlers, mapProps } from 'recompose'

import { auth, setRegisterError } from '../actions'
import { validate } from '../utils'
import Register from '../components/Register'
import '../styles/Auth.css'


//#region COMPONENT HANDLERS
const withComponentHandlers = withHandlers({
	handleSubmit: ({ auth, setRegisterError }) => (email, pw) => {
		const validated = validate(email, pw)

		if (validated.valid) {
			auth(email, pw)
		} else {
			setRegisterError(validated.error)
		}
	}
})
//#endregion


//#region REDUX CONNECTION
const mapStateToProps = state => ({
	registrationError: state.user.registrationError,
})
const mapDispatchToProps = dispatch => ({
	auth: (email, pw) => dispatch(auth(email, pw)),
	setRegisterError: error => dispatch(setRegisterError(error)),
})
const withReduxConnection = connect(mapStateToProps, mapDispatchToProps)
//#endregion


//#region MAP PROPS
const withMappedProps = mapProps(({
	registrationError,
	auth,
	setRegisterError,
	handleSubmit
}) => ({
	regError: registrationError,
	register: handleSubmit,
	setRegisterError,
	auth,
}))
//#endregion


export default compose(
	withReduxConnection,
	withComponentHandlers,
	withMappedProps,
)(Register)
