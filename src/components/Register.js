import React from 'react'

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

export default Register
