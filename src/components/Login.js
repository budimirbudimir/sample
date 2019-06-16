import React from 'react'
import { connect } from 'react-redux'
// import { compose, withHandlers } from 'recompose'

import { login, setLoginError, resetPassword } from '../actions'
import { validate, emailRegex } from '../utils'
import '../styles/Auth.css'

// #region COMPONENT
const Login = ({ loginError, login, setLoginError, resetPassword }) => {
  let email
  let pw

  const onSubmit = e => {
    e.preventDefault()
    if (email.value && pw.value) {
      const validated = validate(email.value, pw.value)

      if (validated.valid) {
        login(email.value, pw.value)
      } else {
        setLoginError(validated.error)
      }
    }
  }

  const onReset = e => {
    e.preventDefault()
    const validEmail = emailRegex.test(email.value)
    if (validEmail) {
      resetPassword(email.value)
    } else {
      setLoginError('Please, enter valid email to reset password!')
    }
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

//#region REDUX CONNECTION
const mapStateToProps = state => ({
  loginError: state.user.loginError
})
const mapDispatchToProps = dispatch => ({
  login: (email, pw) => dispatch(login(email, pw)),
  setLoginError: error => dispatch(setLoginError(error)),
  resetPassword: email => dispatch(resetPassword(email))
})
//#endregion

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
