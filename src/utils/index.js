// email regex
// eslint-disable-next-line
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// validation function
export const validate = (email, pw) => {
  if (email.length < 6) {
    return { valid: false, error: 'Email too short' }
  }

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please use valid email format' }
  }

  if (pw.length < 6) {
    return { valid: false, error: 'Password too short' }
  }

  return { valid: true, message: '' }
}

export const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
