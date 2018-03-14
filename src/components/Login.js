// @flow

import React from 'react'

type Props = {
	// loginError is string containing login form error
	loginError?: string,
	// submit is function invoking parent function handleSubmit
	submit: (string, string) => void,
	// reset is function invoking parent function handleResetPassword
	reset: string => void,
}

const Login = ({ loginError, submit, reset }: Props) => {
	// email: ?HTMLInputElement
	// pw: ?HTMLInputElement
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
					<a className="resetPassword" onClick={onReset}>
						Forgot Password?
					</a>
				</p>

				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login
