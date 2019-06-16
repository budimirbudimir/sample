import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, mapProps } from 'recompose'

import { auth, setRegisterError } from '../actions'
import { validate } from '../utils'
import '../styles/Auth.css'

//#region COMPONENT
const Register = ({ regError, register }) => {
  let email
  let pw

  const onRegister = e => {
    e.preventDefault()

    if (email && pw) register(email.value, pw.value)
  }

  return (
    <div className="Auth">
      {regError && <p className="App-alert App-error">{regError}</p>}

      <h3>Register</h3>

      <form onSubmit={onRegister}>
        <div className="Auth-email_container">
          <input type="text" ref={el => (email = el)} placeholder="Email" />
        </div>

        <div className="Auth-password_container">
          <input type="password" placeholder="Password" ref={el => (pw = el)} />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}
//#endregion

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
  registrationError: state.user.registrationError
})
const mapDispatchToProps = dispatch => ({
  auth: (email, pw) => dispatch(auth(email, pw)),
  setRegisterError: error => dispatch(setRegisterError(error))
})
const withReduxConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)
//#endregion

//#region MAP PROPS
const withMappedProps = mapProps(
  ({ registrationError, auth, setRegisterError, handleSubmit }) => ({
    regError: registrationError,
    register: handleSubmit,
    setRegisterError,
    auth
  })
)
//#endregion

export default compose(
  withReduxConnection,
  withComponentHandlers,
  withMappedProps
)(Register)
