import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'

import { login, setLoginError, resetPassword } from '../actions'
import { validate } from '../utils'
import '../styles/Auth.css'

// #region COMPONENT
const Login = ({ loginError, submit, reset }) => {
  let email
  let pw

  const onSubmit = e => {
    e.preventDefault()
    if (email && pw) submit(email.value, pw.value)
  }

  const onReset = e => {
    e.preventDefault()
    if (email) reset(email.value)
  }

  return (
    <div className="Auth">
      {loginError && <p className="App-alert App-error">{loginError}</p>}

      <h3>Login</h3>

      <form onSubmit={onSubmit}>
        <div className="Auth-email_container">
          <input type="text" ref={el => (email = el)} placeholder="Email" />
        </div>

        <div className="Auth-password_container">
          <input type="password" placeholder="Password" ref={el => (pw = el)} />
        </div>

        <p>
          <button className="resetPassword" onClick={onReset}>
            Forgot Password?
          </button>
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
// #endregion

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
  loginError: state.user.loginError
})
const mapDispatchToProps = dispatch => ({
  login: (email, pw) => dispatch(login(email, pw)),
  setLoginError: error => dispatch(setLoginError(error)),
  resetPassword: email => dispatch(resetPassword(email))
})
const withReduxConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)
//#endregion

export default compose(
  withReduxConnection,
  withLoginActions
)(Login)
